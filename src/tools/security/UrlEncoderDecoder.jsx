import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import useCopy from "../../hooks/useCopy";

import { encodeUrl, decodeUrl } from "../../utils/url";

export default function UrlEncoderDecoder() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState(null);

  const { copied, copy } = useCopy();

  const handleProcess = () => {
    setError(null);

    try {
      if (mode === "encode") {
        setResult(encodeUrl(text));
      } else {
        setResult(decodeUrl(text));
      }
    } catch (err) {
      setError("Invalid input for " + mode);
      setResult("");
    }
  };

  const handleClear = () => {
    setText("");
    setResult("");
    setError(null);
  };

  return (
    <ToolLayout
      header={
        <div>
          <h1>URL Encoder / Decoder</h1>
          <p>RFC 3986 compliant encoding and decoding for URL components.</p>

          {error && <div className="error-badge">{error}</div>}
        </div>
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder={
            mode === "encode" ? "Enter text..." : "Enter URL encoded text..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      }
      output={
        <textarea
          className="tool-textarea"
          placeholder="Result will appear here..."
          value={result}
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
            onClick={() => copy(result)}
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
