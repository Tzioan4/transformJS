import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = () => {
    setError(null);

    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (err) {
      setError("Invalid input for " + mode);
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      // fallback for iOS/mobile
      const textarea = document.createElement("textarea");
      textarea.value = output;
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
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>Base64 {mode === "encode" ? "Encoder" : "Decoder"}</h1>
        <p>Convert text to Base64 format and vice versa instantly.</p>
      </div>

      {/* mode switch*/}
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
      </div>

      {/*error */}
      {error && <div className="error-badge">{error}</div>}

      {/* workspace*/}
      <div className="tool-workspace">
        {/*input */}
        <textarea
          className="tool-textarea"
          placeholder={
            mode === "encode" ? "Enter plain text..." : "Enter Base64 string..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* output*/}
        <textarea
          className="tool-textarea"
          placeholder="Result will appear here..."
          value={output}
          readOnly
        />
      </div>

      {/* actions */}
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
