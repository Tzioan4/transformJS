import { useState } from "react";
import { marked } from "marked";

export default function MarkdownPreview() {
  // markdown input from user
  const [md, setMd] = useState(
    "# Markdown Title\n\n**Bold text** and [links](https://transformjs.com)",
  );

  // copy feedback state
  const [copied, setCopied] = useState(false);

  // copy rendered html to clipboard
  const handleCopy = () => {
    // convert markdown to html and copy it
    navigator.clipboard.writeText(marked(md));

    // show copied feedback
    setCopied(true);

    // reset copied state after short delay
    setTimeout(() => setCopied(false), 1500);
  };

  // clear markdown input
  const handleClear = () => {
    setMd("");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>Markdown Preview</h1>
        <p>convert markdown into html preview</p>
      </div>

      <div className="tool-workspace">
        {/* markdown input area */}
        <textarea
          className="tool-textarea"
          value={md}
          onChange={(e) => setMd(e.target.value)}
        />

        {/* rendered markdown preview */}
        <div
          className="markdown-body"
          style={{
            textAlign: "left",
            padding: "20px",
            background: "#f8fafc",
            color: "#1e293b",
            borderRadius: "8px",
            height: "400px",
            overflowY: "auto",
            border: "1px solid #1f2937",
          }}
          dangerouslySetInnerHTML={{ __html: marked(md) }}
        />
      </div>

      <div className="tool-actions">
        {/* copy html output */}
        <button
          className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        {/* clear markdown */}
        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
