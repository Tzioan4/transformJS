import { useState, useEffect } from "react";
import { marked } from "marked";
import ToolInfo from "../../components/ToolInfo";
import DOMPurify from "dompurify";

export default function MarkdownPreview({ tips }) {
  const [md, setMd] = useState(
    "# Markdown Title\n\n**Bold text** and [links](https://transformjs.com)",
  );
  const [copied, setCopied] = useState(false);

  //configure marked to open all links in a new tab
  useEffect(() => {
    const renderer = new marked.Renderer();
    const originalLink = renderer.link.bind(renderer);

    renderer.link = (href, title, text) => {
      const html = originalLink(href, title, text);
      //inject target + rel into the generated <a ...>
      return html.replace(
        /^<a /,
        '<a target="_blank" rel="noopener noreferrer" ',
      );
    };

    marked.setOptions({ renderer });
  }, []);

  //DOMPurify strips target/rel by default, must whitelist them
  const htmlOutput = DOMPurify.sanitize(marked.parse(md), {
    ADD_ATTR: ["target", "rel"],
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
  });

  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <base target="_blank">
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
          a { color: #2563eb; }
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
        {tips && <ToolInfo tips={tips} />}
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
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>

      <div className="tool-actions">
        <button
          onClick={handleCopy}
          className={`btn ${copied ? "btn-success" : "btn-copy"}`}
        >
          {copied ? "Copied" : "Copy"}
          <span className="btn-hint">Ctrl+Shift+C</span>
        </button>
        <button className="btn btn-danger" onClick={() => setMd("")}>
          Clear <span className="btn-hint">Esc</span>
        </button>
      </div>
    </div>
  );
}
