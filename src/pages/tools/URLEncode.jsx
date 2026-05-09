import { useState } from "react";

export default function URLEncode() {
  // input text from user
  const [text, setText] = useState("");

  // encoded or decoded result
  const [result, setResult] = useState("");

  // mode state to switch between encode and decode
  const [mode, setMode] = useState("encode");

  // copy feedback state
  const [copied, setCopied] = useState(false);

  // error state for invalid input
  const [error, setError] = useState(null);

  // handle encode or decode process
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
    } catch (e) {
      // handle invalid input error
      setError("Invalid input for " + mode);
      setResult("");
    }
  };

  // copy result to clipboard
  const handleCopy = () => {
    if (!result) return;

    navigator.clipboard.writeText(result);

    // show copied state
    setCopied(true);

    // reset copied state after short delay
    setTimeout(() => setCopied(false), 1200);
  };

  // clear input and output
  const handleClear = () => {
    setText("");
    setResult("");
    setError(null);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>URL Encoder / Decoder</h1>
        <p>convert text to url safe format and back</p>
      </div>

      {/* mode switch buttons */}
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

      {/* error display */}
      {error && <div className="error-badge">{error}</div>}

      <div className="tool-workspace">
        {/* input field */}
        <textarea
          className="tool-textarea"
          placeholder={
            mode === "encode"
              ? "enter text to encode..."
              : "enter url encoded string..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* output field */}
        <textarea
          className="tool-textarea"
          placeholder="result will appear here..."
          value={result}
          readOnly
        />
      </div>

      {/* action buttons */}
      <div className="tool-actions">
        <button onClick={handleProcess} className="btn btn-primary">
          Run
        </button>

        <button
          onClick={handleCopy}
          className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        <button onClick={handleClear} className="btn btn-danger">
          Clear
        </button>
      </div>
    </div>
  );
}
