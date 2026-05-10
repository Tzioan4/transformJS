import { useState } from "react";

export default function HtmlPreview() {
  const [code, setCode] = useState(
    "<h1>Hello World</h1>\n<p style='color: #2528d4'>Start coding...</p>",
  );

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      // fallback for iOS/mobile browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.setAttribute("readonly", "");
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
    setCode("");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>HTML Preview</h1>
        <p>Write HTML and CSS and see live preview.</p>
      </div>

      <div className="tool-workspace">
        {/*input */}
        <textarea
          className="tool-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your HTML here..."
        />

        {/* preview*/}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            height: "400px",
            border: "1px solid #1f2937",
          }}
        >
          <iframe
            title="preview"
            srcDoc={code}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>

      {/*actions */}
      <div className="tool-actions">
        <button
          onClick={handleCopy}
          className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
        >
          {copied ? "Copied" : "Copy HTML"}
        </button>

        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
