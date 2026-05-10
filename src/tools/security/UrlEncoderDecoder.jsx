import { useState } from "react";

export default function UrlEncode() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = () => {
    setError(null);

    try {
      if (mode === "encode") {
        // convert text to url safe format
        setResult(encodeURIComponent(text));
      } else {
        // decode url encoded string
        setResult(decodeURIComponent(text));
      }
    } catch (err) {
      // handle invalid input error
      setError("invalid input for " + mode);
      setResult("");
    }
  };

  const handleCopy = async () => {
    if (!result) return;

    try {
      // copy result using clipboard api
      await navigator.clipboard.writeText(result);

      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      // fallback copy method for mobile browsers
      const textarea = document.createElement("textarea");
      textarea.value = result;
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  const handleClear = () => {
    // reset all states
    setText("");
    setResult("");
    setError(null);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>URL Encoder/Decoder</h1>
        <p>Convert text to URL safe format and vice versa.</p>
      </div>

      <div className="tool-actions">
        <button
          className={`btn ${mode === "encode" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => {
            // set encode mode
            setMode("encode");
            setError(null);
          }}
        >
          Encode
        </button>

        <button
          className={`btn ${mode === "decode" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => {
            // set decode mode
            setMode("decode");
            setError(null);
          }}
        >
          Decode
        </button>
      </div>

      {error && <div className="error-badge">{error}</div>}

      <div className="tool-workspace">
        <textarea
          className="tool-textarea"
          placeholder={
            mode === "encode"
              ? "enter text to encode"
              : "enter url encoded string"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <textarea
          className="tool-textarea"
          placeholder="result will appear here"
          value={result}
          readOnly
        />
      </div>

      <div className="tool-actions">
        <button onClick={handleProcess} className="btn btn-primary">
          Run
        </button>

        <button
          onClick={handleCopy}
          className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
        >
          {copied ? "Copied" : "Copy"}
        </button>

        <button onClick={handleClear} className="btn btn-danger">
          Clear
        </button>
      </div>
    </div>
  );
}
