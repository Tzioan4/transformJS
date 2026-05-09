import { useState } from "react";

export default function HtmlPreview() {
  // state to store html code input from user
  const [code, setCode] = useState(
    "<h1>Hello World</h1>\n<p style='color: #6366f1'>Start coding...</p>",
  );

  // state for copy feedback button
  const [copied, setCopied] = useState(false);

  // copy html code to clipboard
  const handleCopy = () => {
    if (!code) return;

    navigator.clipboard.writeText(code);

    // show copied state for a short time
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // clear editor content
  const handleClear = () => {
    setCode("");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>HTML Preview</h1>
        <p>write html and css and see live preview</p>
      </div>

      <div className="tool-workspace">
        {/* text area for writing html */}
        <textarea
          className="tool-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="write your html here..."
        />

        {/* live preview using iframe */}
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            overflow: "hidden",
            height: "400px",
            border: "1px solid #1f2937",
          }}
        >
          <iframe
            title="preview"
            srcDoc={code}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>

      <div className="tool-actions">
        <button
          className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy HTML"}
        </button>

        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
