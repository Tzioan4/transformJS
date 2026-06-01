import { formatJson, minifyJson } from "../../utils/json";
import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { readTextFile } from "../../utils/file";
import DropOverlay from "../../components/DropOverlay";


export default function JsonFormatter({ tips, category }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [error, setError] = useState(null);
  const [isMinified, setIsMinified] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState([]);
  const [fileMessage, setFileMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const { copied, copy } = useCopy();

  const handleFormat = async () => {
    try {
      const { detectDuplicateKeys } = await import("../../utils/json");
      const dupes = detectDuplicateKeys(input);

      setDuplicateWarning(dupes);
      setOutput(formatJson(input));
      setIsMinified(false);
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setOutput("");
      setDuplicateWarning([]);
    }
  };

  const handleMinify = async () => {
    try {
      const { detectDuplicateKeys } = await import("../../utils/json");
      const dupes = detectDuplicateKeys(input);

      setDuplicateWarning(dupes);
      setOutput(minifyJson(input));
      setIsMinified(true);
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setOutput("");
      setDuplicateWarning([]);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setIsMinified(false);
    setDuplicateWarning([]);
    setIsDragging(false);
  };

  const handleFileLoad = async (file) => {
    try {
      const text = await readTextFile(file, {
        allowedExtensions: [".json"],
        maxSize: 2 * 1024 * 1024,
      });

      setInput(text);
      setOutput("");
      setError(null);
      setDuplicateWarning([]);
      setIsMinified(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = isMinified ? "minified.json" : "formatted.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>JSON Formatter</h1>
          <p>
            Prettify, minify, and validate JSON structures with syntax
            highlighting.
          </p>

          {output && !error && (
            <div
              className={`status-badge ${
                isMinified ? "status-min" : "status-pretty"
              }`}
              style={{
                marginTop: "10px",
                display: "inline-block",
                fontSize: "0.75rem",
                padding: "4px 12px",
                borderRadius: "6px",
              }}
            >
              STATUS: <strong>{isMinified ? "MINIFIED" : "FORMATTED"}</strong>
            </div>
          )}

          {error && <div className="error-badge">{error}</div>}

          {duplicateWarning.length > 0 && (
            <div
              className="error-badge"
              style={{
                marginTop: "8px",
                background: "rgba(245, 158, 11, 0.05)",
                borderColor: "rgba(245, 158, 11, 0.3)",
                color: "rgba(251, 191, 36, 0.8)",
              }}
            >
              Duplicate keys detected and overwritten:{" "}
              {duplicateWarning.map((key, index) => (
                <strong key={index}>
                  "{key}"{index < duplicateWarning.length - 1 ? ", " : ""}
                </strong>
              ))}
            </div>
          )}

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
          {isDragging && <DropOverlay label="Drop .json file here" />}
          <textarea
            className="tool-textarea"
            placeholder="Paste JSON here, upload a .json file, or drag and drop it."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setFileMessage("");
            }}
          />

          <label className="file-load-btn">
            Load .json file
            <input
              type="file"
              accept=".json,application/json"
              onChange={(e) => handleFileLoad(e.target.files[0])}
            />
          </label>
        </div>
      }
      output={
        <div className="file-drop-wrap">
          <textarea
            className="tool-textarea"
            placeholder="Formatted json will appear here..."
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
          <button onClick={handleFormat} className="btn btn-primary">
            Beautify
          </button>

          <button onClick={handleMinify} className="btn btn-secondary">
            Minify
          </button>

          <button
            onClick={() => copy(output)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!output}
          >
            {copied ? "Copied" : "Copy"}
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
