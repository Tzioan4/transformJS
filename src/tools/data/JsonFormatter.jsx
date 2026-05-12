import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import useCopy from "../../hooks/useCopy";

import { formatJson, minifyJson } from "../../utils/json";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const { copied, copy } = useCopy();

  const handleFormat = () => {
    try {
      setOutput(formatJson(input));
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      setOutput(minifyJson(input));
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