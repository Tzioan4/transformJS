import { useState, useEffect, useRef } from "react";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { readTextFile } from "../../utils/file";
import "../../styles/tools/yaml.css";
import DropOverlay from "../../components/DropOverlay";

const TIMEOUT_MS = 2000;
const MAX_INPUT_SIZE = 50_000;

export default function YamlToJson({ tips }) {
  const [yamlInput, setYamlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
      setError(
        `Input too large — maximum allowed size is ${MAX_INPUT_SIZE / 1000}KB`,
      );
      setJsonOutput("");
      setIsRunning(false);
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

  const handleClear = () => {
    setYamlInput("");
    setJsonOutput("");
    setError(null);
    setIsRunning(false);
    setIsDragging(false);
  };

  const handleFileLoad = async (file) => {
    try {
      const text = await readTextFile(file, {
        allowedExtensions: [".yaml", ".yml"],
        maxSize: 2 * 1024 * 1024,
      });

      setYamlInput(text);
      setJsonOutput("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => {
    if (!jsonOutput) return;

    const blob = new Blob([jsonOutput], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <span className="tool-category-badge">Data</span>
        <h1>YAML to JSON</h1>
        <p>Convert your YAML configuration to a clean JSON object.</p>

        {isRunning && (
          <div className="status-badge status-pretty">Parsing YAML...</div>
        )}

        {error && <div className="error-badge">{error}</div>}

        {tips && <ToolInfo tips={tips} />}
      </div>

      <div className="tool-workspace">
        <div
          className={`file-drop-wrap ${isDragging ? "dragging" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileLoad(e.dataTransfer.files[0]);
          }}
        >
          {isDragging && <DropOverlay label="Drop .yaml file here" />}
          <textarea
            className="tool-textarea"
            placeholder="Paste YAML here, upload a .yaml file, or drag and drop it."
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
          />

          <label className="file-load-btn">
            Load .yaml file
            <input
              type="file"
              accept=".yaml,.yml,text/yaml,text/x-yaml"
              onChange={(e) => handleFileLoad(e.target.files[0])}
            />
          </label>
        </div>

        <div className="file-drop-wrap">
          <textarea
            className="tool-textarea"
            placeholder="JSON output..."
            value={jsonOutput}
            readOnly
          />

          {jsonOutput && (
            <button
              type="button"
              className="file-download-btn"
              onClick={handleDownload}
            >
              Download
            </button>
          )}
        </div>
      </div>

      <div className="tool-actions">
        <button
          onClick={() => copy(jsonOutput)}
          className={`btn ${copied ? "btn-success" : "btn-copy"}`}
          disabled={!jsonOutput}
        >
          {copied ? "Copied" : "Copy JSON"}
          <span className="btn-hint">Ctrl+Shift+C</span>
        </button>

        <button onClick={handleClear} className="btn btn-danger">
          Clear <span className="btn-hint">Esc</span>
        </button>
      </div>
    </div>
  );
}
