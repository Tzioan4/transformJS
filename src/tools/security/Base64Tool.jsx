import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import useCopy from "../../hooks/useCopy";

import { encodeBase64, decodeBase64 } from "../../utils/base64";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState(null);

  const { copied, copy } = useCopy();

  const handleProcess = () => {
    setError(null);

    try {
      if (mode === "encode") {
        setOutput(encodeBase64(input));
      } else {
        setOutput(decodeBase64(input));
      }
    } catch (err) {
      setError("Invalid input for " + mode);
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
          <h1>Base64 Tool</h1>
          <p>Encode and decode text using Base64.</p>

          {error && <div className="error-badge">{error}</div>}
        </div>
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder={mode === "encode" ? "Enter text..." : "Enter Base64..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      }
      output={
        <textarea
          className="tool-textarea"
          placeholder="Result will appear here..."
          value={output}
          readOnly
        />
      }
      actions={
        <div className="tool-actions">
          <button
            onClick={() => {
              setMode("encode");
              setError(null);
            }}
            className={`btn ${mode === "encode" ? "btn-primary" : "btn-secondary"}`}
          >
            Encode
          </button>

          <button
            onClick={() => {
              setMode("decode");
              setError(null);
            }}
            className={`btn ${mode === "decode" ? "btn-primary" : "btn-secondary"}`}
          >
            Decode
          </button>

          <button onClick={handleProcess} className="btn btn-primary">
            Run
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
