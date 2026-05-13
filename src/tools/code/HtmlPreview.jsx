import { useState, useEffect } from "react";

export default function HtmlPreview() {
  const [code, setCode] = useState(
    `<h1> Hello World </h1>`,
  );

  const [copied, setCopied] = useState(false);


  const finalHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        ${code}
      </body>
    </html>
  `;

  const handleCopy = async () => {
  try {
    // Χρήση του σύγχρονου Clipboard API
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  } catch (err) {
    // Fallback σε περίπτωση που ο browser είναι πολύ παλιός ή δεν έχει δικαιώματα
    console.error('Αποτυχία αντιγραφής:', err);
    
    // Αν θες οπωσδήποτε fallback, χρησιμοποίησε το textarea 
    // αλλά χωρίς να το κάνεις append στο body (αν είναι δυνατόν)
  }
};

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>HTML Preview</h1>
        <p>Real-time sandboxed rendering for HTML and CSS snippets.</p>
      </div>

      <div className="tool-workspace">
        <textarea
          className="tool-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Start writing HTML/CSS code"
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
            title="freedom-preview"
            srcDoc={finalHtml}
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
        <button className="btn btn-danger" onClick={() => setCode("")}>
          Clear
        </button>
      </div>
    </div>
  );
}
