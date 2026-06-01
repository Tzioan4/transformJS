import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { readTextFile } from "../../utils/file";
import DropOverlay from "../../components/DropOverlay";

export default function MarkdownPreview({ tips }) {
  const [md, setMd] = useState("");
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { copied, copy } = useCopy();

  useEffect(() => {
    const renderer = new marked.Renderer();
    const originalLink = renderer.link.bind(renderer);

    renderer.link = (href, title, text) => {
      const html = originalLink(href, title, text);

      return html.replace(
        /^<a /,
        '<a target="_blank" rel="noopener noreferrer" ',
      );
    };

    marked.setOptions({ renderer });
  }, []);

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

          h1, h2, h3 {
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 0.3em;
          }

          code {
            background: #f1f5f9;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: monospace;
          }

          pre {
            background: #f1f5f9;
            padding: 16px;
            border-radius: 8px;
            overflow: auto;
          }

          blockquote {
            border-left: 4px solid #cbd5e1;
            padding-left: 16px;
            color: #64748b;
            margin: 0;
          }

          img {
            max-width: 100%;
          }

          a {
            color: #2563eb;
          }
        </style>
      </head>
      <body>${htmlOutput}</body>
    </html>
  `;

  const handleClear = () => {
    setMd("");
    setError(null);
    setIsDragging(false);
  };

  const handleFileLoad = async (file) => {
    if (!file) return;

    try {
      const text = await readTextFile(file, {
        allowedExtensions: [".md", ".markdown", ".txt"],
        maxSize: 2 * 1024 * 1024,
      });

      setMd(text);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

const handleDownload = () => {
  if (!md.trim()) return;

  const blob = new Blob([md], {
    type: "text/markdown",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "document.md";
  link.click();

  URL.revokeObjectURL(url);
};

  return (
    <div className="tool-container">
      <div className="tool-header">
        <span className="tool-category-badge">Code</span>
        <h1>Markdown Preview</h1>
        <p>Instant Markdown to HTML conversion with isolated preview.</p>

        {error && <div className="error-badge">{error}</div>}

        {tips && <ToolInfo tips={tips} />}
      </div>

      <div className="tool-workspace">
        <div
          className={`file-drop-wrap ${isDragging ? "dragging" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileLoad(e.dataTransfer.files[0]);
          }}
        >
          {isDragging && <DropOverlay label="Drop .md file here" />}

          <textarea
            className="tool-textarea"
            value={md}
            onChange={(e) => {
              setMd(e.target.value);
              setError(null);
            }}
            placeholder="Write markdown here, upload a .md file, or drag and drop it."
          />

          <label className="file-load-btn">
            Load .md file
            <input
              type="file"
              accept=".md,.markdown,.txt,text/markdown,text/plain"
              onChange={(e) => handleFileLoad(e.target.files[0])}
            />
          </label>
        </div>

        <div className="file-drop-wrap">
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
              title="markdown-preview"
              srcDoc={iframeSrcDoc}
              sandbox="allow-popups"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "#ffffff",
              }}
            />
          </div>

          {md.trim() && (
            <button
              type="button"
              className="file-download-btn"
              onClick={handleDownload}
            >
              Download
            </button>
          )}
        </div>
      </div>

      <div className="tool-actions">
        <button
          onClick={() => copy(md)}
          className={`btn ${copied ? "btn-success" : "btn-copy"}`}
          disabled={!md}
        >
          {copied ? "Copied" : "Copy Markdown"}
          <span className="btn-hint">Ctrl+Shift+C</span>
        </button>

        <button onClick={handleClear} className="btn btn-danger">
          Clear <span className="btn-hint">Esc</span>
        </button>
      </div>
    </div>
  );
}
