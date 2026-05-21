import { useState, useEffect, useRef } from "react";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import "../../styles/tools/yaml.css";

const TIMEOUT_MS = 2000;
const MAX_INPUT_SIZE = 50_000;

export default function YamlToJson({ tips }) {
  const [yamlInput, setYamlInput] = useState(
    "server:\n  port: 8080\n  host: localhost\n  enabled: true\ntags:\n  - docker\n  - react",
  );
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { copied, copy } = useCopy();
  const workerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (workerRef.current) workerRef.current.terminate();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!yamlInput.trim()) {
      setJsonOutput("");
      setError(null);
      setIsRunning(false);
      return;
    }

    if (yamlInput.length > MAX_INPUT_SIZE) {
      setError(`Input too large — maximum allowed size is ${MAX_INPUT_SIZE / 1000}KB`);
      setJsonOutput("");
      return;
    }

    setIsRunning(true);
    setError(null);

    const worker = new Worker("/yamlWorker.js");
    workerRef.current = worker;

    timeoutRef.current = setTimeout(() => {
      worker.terminate();
      workerRef.current = null;
      setIsRunning(false);
      setJsonOutput("");
      setError("YAML parsing timeout! possible YAML Bomb detected.");
    }, TIMEOUT_MS);

    worker.onmessage = (e) => {
      clearTimeout(timeoutRef.current);
      workerRef.current = null;
      setIsRunning(false);

      if (e.data.type === "success") {
        setJsonOutput(e.data.json);
        setError(null);
      } else {
        setError(e.data.message);
        setJsonOutput("");
      }
    };

    worker.onerror = (e) => {
      clearTimeout(timeoutRef.current);
      workerRef.current = null;
      setIsRunning(false);
      setError("Worker error: " + e.message);
      setJsonOutput("");
    };

    worker.postMessage({ input: yamlInput });
  }, [yamlInput]);

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>YAML to JSON</h1>
        <p>Convert your YAML configuration to a clean JSON object.</p>
        {tips && <ToolInfo tips={tips} />}
      </div>

      {error && (
        <div className="error-badge" style={{ marginBottom: "15px" }}>
          {error}
        </div>
      )}

      {isRunning && (
        <div className="status-badge" style={{
          marginBottom: "15px",
          display: "inline-block",
          color: "#94a3b8",
          borderColor: "#333",
        }}>
          PARSING...
        </div>
      )}

      <div className="tool-workspace">
        <textarea
          className="tool-textarea"
          value={yamlInput}
          onChange={(e) => setYamlInput(e.target.value)}
          placeholder="Paste your YAML here..."
          style={error ? { borderColor: "#ef4444" } : {}}
        />

        <textarea
          className="tool-textarea yaml-output"
          value={jsonOutput}
          readOnly
          placeholder="JSON output will appear here..."
        />
      </div>

      <div className="tool-actions">
        <button
          disabled={!!error || !jsonOutput || isRunning}
          onClick={() => copy(jsonOutput)}
          className={`btn ${copied ? "btn-success" : "btn-copy"}`}
        >
          {copied ? "Copied" : "Copy JSON"}
          <span className="btn-hint">Ctrl+Shift+C</span>
        </button>

        <button className="btn btn-danger" onClick={() => setYamlInput("")}>
          Clear <span className="btn-hint">Esc</span>
        </button>
      </div>
    </div>
  );
}