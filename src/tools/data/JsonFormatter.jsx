import { formatJson, minifyJson } from "../../utils/json";
import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";


const jsonExample = {
  project: "transformJS",
  status: "active",
  features: ["Minify", "Beautify", "Run"],
  author: "John Doe.",
  version: 1.0,
};

  export default function JsonFormatter({ tips }) {
  const [input, setInput] = useState(JSON.stringify(jsonExample, null, 2));
  const [output, setOutput] = useState(() =>
    formatJson(JSON.stringify(jsonExample)),
  );  
  const [error, setError] = useState(null);
  const [isMinified, setIsMinified] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState([]);


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
};

  return (
    <ToolLayout
      header={
        <div>
          <h1>JSON Formatter</h1>
          <p>
            Prettify, minify, and validate JSON structures with syntax
            highlighting.
          </p>

          {output && !error && (
            <div
              className={`status-badge ${isMinified ? "status-min" : "status-pretty"}`}
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
      color: "rgba(251, 191, 36, 0.8)"
    }}
  >
    Duplicate keys detected and overwritten:{" "}
    {duplicateWarning.map((k, i) => (
      <strong key={i}>"{k}"{i < duplicateWarning.length - 1 ? ", " : ""}</strong>
    ))}
  </div>
)}
          {tips && <ToolInfo tips={tips} />}
        </div>
        
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder="Paste json here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      }
      output={
        <textarea
          className="tool-textarea"
          placeholder="Formatted json will appear here..."
          value={output}
          readOnly
        />
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
