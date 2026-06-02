import { useState, useCallback, useRef } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { readTextFile } from "../../utils/file";
import DropOverlay from "../../components/DropOverlay";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-512"];
const WEAK_ALGOS = new Set(["SHA-1"]);

const ALLOWED_FILE_TYPES = [
  ".txt",
  ".json",
  ".md",
  ".markdown",
  ".html",
  ".htm",
  ".css",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".sql",
  ".yaml",
  ".yml",
  ".csv",
];

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
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashGenerator({ tips, category }) {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
        setError(null);
      }
    } catch {
      if (currentId === latestHashRef.current) {
        setOutput("");
        setError("Error generating hash");
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;

    setInput(value);
    setError(null);
    handleHash(value.trim(), algo);
  };

  const handleAlgoChange = (nextAlgo) => {
    setAlgo(nextAlgo);
    handleHash(input.trim(), nextAlgo);
  };

  const handleFileLoad = async (file) => {
    if (!file) return;

    try {
      const text = await readTextFile(file, {
        allowedExtensions: ALLOWED_FILE_TYPES,
        maxSize: 2 * 1024 * 1024,
      });

      setInput(text);
      setError(null);
      handleHash(text.trim(), algo);
    } catch (err) {
      setError(err.message);
      setOutput("");
    }
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${algo.toLowerCase()}-hash.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setIsDragging(false);
  };

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>Hash Generator</h1>
          <p>
            Generate cryptographic hashes using the browser's native Web Crypto
            API.
          </p>

          <div className="mode-indicator encode hash-algorithm-indicator">
            ALGORITHM: <strong>{algo}</strong>
          </div>

          {WEAK_ALGOS.has(algo) && (
            <div className="warning-badge">
              <span>
                <strong>{algo}</strong> is cryptographically broken. Do not use
                for passwords or signatures.
              </span>
            </div>
          )}

          {input !== input.trimEnd() && (
            <div className="input-warning-text hash-input-warning">
              Trailing whitespace detected and stripped before hashing
            </div>
          )}

          {error && <div className="error-badge">{error}</div>}

          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
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
          {isDragging && <DropOverlay label="Drop file here" />}

          <textarea
            className="tool-textarea"
            placeholder="Type text, upload a file, or drag and drop it."
            value={input}
            onChange={handleInputChange}
          />

          <label className="file-load-btn">
            Load file
            <input
              type="file"
              accept={ALLOWED_FILE_TYPES.join(",")}
              onChange={(e) => handleFileLoad(e.target.files[0])}
            />
          </label>
        </div>
      }
      output={
        <div className="file-drop-wrap">
          <textarea
            className="tool-textarea hash-output"
            placeholder="Hash output will appear here..."
            value={output}
            readOnly
          />

          {output && (
            <button
              type="button"
              className="file-download-btn"
              onClick={handleDownload}
            >
              Download
            </button>
          )}
        </div>
      }
      actions={
        <div className="tool-actions">
          {ALGORITHMS.map((algorithm) => (
            <button
              key={algorithm}
              onClick={() => handleAlgoChange(algorithm)}
              className={`btn ${
                algo === algorithm ? "btn-primary" : "btn-secondary"
              }`}
            >
              {algorithm}
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

          <button onClick={handleClear} className="btn btn-danger">
            Clear <span className="btn-hint">Esc</span>
          </button>
        </div>
      }
    />
  );
}
