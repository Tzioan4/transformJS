import { useState, useEffect } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import useCopy from "../../hooks/useCopy";
import { formatJson, minifyJson } from "../../utils/json";

const jsonExample = {
  project: "transformJS",
  status: "active",
  features: ["Minify", "Beautify", "Run"],
  author: "John Doe.",
  version: 1.0,
};

export default function JsonFormatter() {
  const [input, setInput] = useState(JSON.stringify(jsonExample, null, 2));
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  //badge setter based on current state
  const [isMinified, setIsMinified] = useState(false);

  const { copied, copy } = useCopy();

  useEffect(() => {
    try {
      setOutput(formatJson(JSON.stringify(jsonExample)));
      setIsMinified(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleFormat = () => {
    try {
      setOutput(formatJson(input));
      setIsMinified(false); //formated state
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      setOutput(minifyJson(input));
      setIsMinified(true);//minified state
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setIsMinified(false);
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

          {/*dynamic status badge*/}
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
          </button>
          <button onClick={handleClear} className="btn btn-danger">
            Clear
          </button>
        </div>
      }
    />
  );
}