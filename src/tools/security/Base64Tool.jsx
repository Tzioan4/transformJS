import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import useCopy from "../../hooks/useCopy";

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
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (err) {
      setError("invalid input for " + mode);
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
          <h1>Base64 {mode === "encode" ? "encoder" : "decoder"}</h1>
          <p>Convert text to base64 and back.</p>

          {error && <div className="error-badge">{error}</div>}
        </div>
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder={
            mode === "encode" ? "Enter plain text..." : "Enter base64 string..."
          }
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
            className={`btn ${mode === "encode" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => {
              setMode("encode");
              setError(null);
            }}
          >
            Encode
          </button>

          <button
            className={`btn ${mode === "decode" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => {
              setMode("decode");
              setError(null);
            }}
          >
            Decode
          </button>

          <button onClick={handleProcess} className="btn btn-primary">
            Run
          </button>

          <button
            onClick={() => copy(output)}
            className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
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
