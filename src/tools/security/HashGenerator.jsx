import { useState, useCallback, useRef } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-512"];
const WEAK_ALGOS = new Set(["SHA-1"]);

async function computeHash(algo, input) {
  const algoMap = {
    "SHA-1": "SHA-1",
    "SHA-256": "SHA-256",
    "SHA-512": "SHA-512",
  };
  const buffer = await crypto.subtle.digest(
    algoMap[algo],
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashGenerator({ tips }) {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();
  const latestHashRef = useRef(0); 

  const handleHash = useCallback(async (value, algorithm) => {
    if (!value) {
      setOutput("");
      return;
    }
    const currentId = ++latestHashRef.current; 
    try {
      const hash = await computeHash(algorithm, value);
      if (currentId === latestHashRef.current) {
        setOutput(hash);
      }
    } catch {
      if (currentId === latestHashRef.current) {
        setOutput("Error generating hash");
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    handleHash(val.trim(), algo);
  };

  const handleAlgoChange = (a) => {
    setAlgo(a);
    handleHash(input.trim(), a);
  };

  return (
    <ToolLayout
      header={
        <div>
          <h1>Hash Generator</h1>
          <p>
            Generate cryptographic hashes using the browser's native Web Crypto
            API.
          </p>

          <div className="mode-indicator encode" style={{ marginTop: "10px" }}>
            ALGORITHM: <strong>{algo}</strong>
          </div>

          {WEAK_ALGOS.has(algo) && (
            <div className="error-badge" style={{ marginTop: "8px" }}>
              {algo} is cryptographically broken. Do not use for passwords or
              signatures.
            </div>
          )}

          {input !== input.trimEnd() && (
            <div className="input-warning-text" style={{ marginTop: "8px" }}>
              Trailing whitespace detected and stripped before hashing
            </div>
          )}

          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder="Type or paste text to hash..."
          value={input}
          onChange={handleInputChange}
        />
      }
      output={
        <textarea
          className="tool-textarea"
          placeholder="Hash output will appear here..."
          value={output}
          readOnly
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
          }}
        />
      }
      actions={
        <div className="tool-actions">
          {ALGORITHMS.map((a) => (
            <button
              key={a}
              onClick={() => handleAlgoChange(a)}
              className={`btn ${algo === a ? "btn-primary" : "btn-secondary"}`}
            >
              {a}
            </button>
          ))}
          <button
            onClick={() => copy(output)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!output}
          >
            {copied ? "Copied" : "Copy Hash"}
            <span className="btn-hint">Ctrl+Shift+C</span>
          </button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
            }}
            className="btn btn-danger"
          >
            Clear <span className="btn-hint">Esc</span>
          </button>
        </div>
      }
    />
  );
}