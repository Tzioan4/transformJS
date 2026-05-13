import { useState } from "react";
import { marked } from "marked";

export default function MarkdownPreview() {
  const [md, setMd] = useState(
    "# Markdown Title\n\n**Bold text** and [links](https://transformjs.com)",
  );
  const [copied, setCopied] = useState(false);

  const htmlOutput = marked.parse(md);

  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: -apple-system, system-ui, sans-serif; 
            line-height: 1.6; 
            color: #1e293b; 
            padding: 20px; 
            margin: 0; 
            background: white; 
          }
          h1, h2, h3 { border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3em; }
          code { background: #f1f5f9; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
          pre { background: #f1f5f9; padding: 16px; border-radius: 8px; overflow: auto; }
          blockquote { border-left: 4px solid #cbd5e1; padding-left: 16px; color: #64748b; margin: 0; }
          img { max-width: 100%; }
        </style>
      </head>
      <body>${htmlOutput}</body>
    </html>
  `;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>Markdown Preview</h1>
        <p>Instant Markdown to HTML conversion with isolated preview.</p>
      </div>

      <div className="tool-workspace">
        <textarea
          className="tool-textarea"
          value={md}
          onChange={(e) => setMd(e.target.value)}
          placeholder="Write markdown here..."
        />

        <div
          style={{
            background: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            height: "100%",
            border: "1px solid #1f2937",
          }}
        >
          <iframe
            title="md-preview"
            srcDoc={iframeSrcDoc}
            sandbox="allow-scripts"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>

      <div className="tool-actions">
        <button
          onClick={handleCopy}
          className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <button className="btn btn-danger" onClick={() => setMd("")}>
          Clear
        </button>
      </div>
    </div>
  );
}
