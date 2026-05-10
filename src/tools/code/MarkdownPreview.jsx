import { useState } from "react";
import { marked } from "marked";

export default function MarkdownPreview() {
  const [md, setMd] = useState(
    "# Markdown Title\n\n**Bold text** and [links](https://transformjs.com)",
  );

  const [copied, setCopied] = useState(false);

  const htmlOutput = marked(md);

  const handleCopy = async () => {
    if (!md) return;

    try {
      await navigator.clipboard.writeText(htmlOutput);

      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      // fallback for iOS
      const textarea = document.createElement("textarea");
      textarea.value = htmlOutput;
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
    setMd("");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>Markdown Preview</h1>
        <p>Convert Markdown into live HTML preview.</p>
      </div>

      <div className="tool-workspace">
        {/* input*/}
        <textarea
          className="tool-textarea"
          value={md}
          onChange={(e) => setMd(e.target.value)}
          placeholder="Write markdown here..."
        />

        {/* preview*/}
        <div
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
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </div>

      {/*actions*/}
      <div className="tool-actions">
        <button
          onClick={handleCopy}
          className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
        >
          {copied ? "Copied" : "Copy"}
        </button>

        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
