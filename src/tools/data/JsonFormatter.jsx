import { useState } from "react";

export default function JsonFormatter() {
  // input json string from user
  const [input, setInput] = useState("");

  // formatted or minified output
  const [output, setOutput] = useState("");

  // error message for invalid json
  const [error, setError] = useState(null);

  // copy button feedback state
  const [copied, setCopied] = useState(false);

  // format json with indentation
  const handleFormat = () => {
    try {
      // parse input string into object
      const parsed = JSON.parse(input);

      // stringify with indentation for readability
      setOutput(JSON.stringify(parsed, null, 2));

      // clear error if success
      setError(null);
    } catch (err) {
      // handle invalid json error
      setError("Invalid JSON: " + err.message);
      setOutput("");
    }
  };

  // minify json (remove spaces)
  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);

      // stringify without spacing
      setOutput(JSON.stringify(parsed));

      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setOutput("");
    }
  };

  // copy output to clipboard 
  const handleCopy = async () => {
    if (!output) return;

    try {
      // modern clipboard api
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(output);
      } else {
        // fallback for mobile / safari
        const textArea = document.createElement("textarea");
        textArea.value = output;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("copy failed:", err);
    }
  };

  // clear input and output
  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>JSON Formatter</h1>
        <p>Format or minify JSON data easily</p>
      </div>

      {/* show error if json is invalid */}
      {error && <div className="error-badge">{error}</div>}

      <div className="tool-workspace">
        {/* input textarea */}
        <textarea
          className="tool-textarea"
          placeholder="paste json here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* output textarea */}
        <textarea
          className="tool-textarea"
          placeholder="formatted json will appear here..."
          value={output}
          readOnly
        />
      </div>

      <div className="tool-actions">
        {/* format json button */}
        <button onClick={handleFormat} className="btn btn-primary">
          Beautify
        </button>

        {/* minify json button */}
        <button onClick={handleMinify} className="btn btn-secondary">
          Minify
        </button>

        {/* copy output button */}
        <button
          onClick={handleCopy}
          className={`btn ${copied ? "btn-success" : "btn-copy"}`}
        >
          {copied ? "Copied" : "Copy"}
        </button>

        {/* clear all button */}
        <button onClick={handleClear} className="btn btn-danger">
          Clear
        </button>
      </div>
    </div>
  );
}
