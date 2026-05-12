import { useState } from "react";
import { format } from "sql-formatter";
import useCopy from "../../hooks/useCopy"; 

export default function SqlFormatter() {
  const [sql, setSql] = useState(
    "SELECT id, name FROM users WHERE active = 1;",
  );

  const { copied, copy } = useCopy();

  const handleFormat = () => {
    try {
      const formatted = format(sql, {
        language: "sql",
        uppercase: true,
      });
      setSql(formatted);
    } catch (err) {
      alert("Invalid SQL query");
    }
  };

  const handleMinify = () => {
    const minified = sql.replace(/\s+/g, " ").trim();
    setSql(minified);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>SQL Formatter</h1>
        <p>Clean up your SQL queries and make them readable.</p>
      </div>

      <div className="tool-workspace" style={{ gridTemplateColumns: "1fr" }}>
        <textarea
          className="tool-textarea"
          style={{ height: "300px", fontFamily: "monospace" }}
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder="Paste your SQL query here..."
        />
      </div>

      <div className="tool-actions">
        <button onClick={handleFormat} className="btn btn-secondary">
          Format SQL
        </button>
        <button onClick={handleMinify} className="btn btn-secondary">
          Minify
        </button>

        <button
          onClick={() => copy(sql)}
          className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
        >
          {copied ? "Copied!" : "Copy SQL"}
        </button>

        <button className="btn btn-danger" onClick={() => setSql("")}>
          Clear
        </button>
      </div>
    </div>
  );
}
