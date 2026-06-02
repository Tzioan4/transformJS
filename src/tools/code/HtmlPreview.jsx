import { useState } from "react";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { readTextFile } from "../../utils/file";
import DropOverlay from "../../components/DropOverlay";
import ToolLayout from "../../layouts/ToolLayout";

export default function HtmlPreview({ tips }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { copied, copy } = useCopy();

  const finalHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:;">
      </head>
      <body>
        ${code}
      </body>
    </html>
  `;

  const handleClear = () => {
    setCode("");
    setError(null);
    setIsDragging(false);
  };

  const handleFileLoad = async (file) => {
    if (!file) return;

    try {
      const text = await readTextFile(file, {
        allowedExtensions: [".html", ".htm", ".txt"],
        maxSize: 2 * 1024 * 1024,
      });

      setCode(text);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => {
    if (!code.trim()) return;

    const blob = new Blob([code], {
      type: "text/html",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "preview.html";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      category="code"
      header={
        <>
          <h1>HTML Preview</h1>
          <p>Real-time sandboxed rendering for HTML and CSS snippets.</p>

          {error && <div className="error-badge">{error}</div>}

          {tips && <ToolInfo tips={tips} />}
        </>
      }
      actions={
        <>
          <button
            onClick={() => copy(code)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!code}
          >
            {copied ? "Copied" : "Copy HTML"}
            <span className="btn-hint">Ctrl+Shift+C</span>
          </button>

          <button onClick={handleClear} className="btn btn-danger">
            Clear <span className="btn-hint">Esc</span>
          </button>
        </>
      }
    >
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
        {isDragging && <DropOverlay label="Drop .html file here" />}

        <textarea
          className="tool-textarea"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(null);
          }}
          placeholder="Write HTML/CSS here, upload a .html file, or drag and drop it."
        />

        <label className="file-load-btn">
          Load .html file
          <input
            type="file"
            accept=".html,.htm,.txt,text/html,text/plain"
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
            title="html-preview"
            srcDoc={finalHtml}
            sandbox=""
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>

        {code.trim() && (
          <button
            type="button"
            className="file-download-btn"
            onClick={handleDownload}
          >
            Download
          </button>
        )}
      </div>
    </ToolLayout>
  );
}
