import { useState, useEffect } from "react";
import { format } from "sql-formatter";
import ToolLayout from "../../layouts/ToolLayout";
import useCopy from "../../hooks/useCopy";

const SQL_EXAMPLE =
  "select id, name, email from users where active = 1 and created_at > '2024-01-01' order by name asc limit 10;";

export default function SqlFormatter() {
  const [input, setInput] = useState(SQL_EXAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const { copied, copy } = useCopy();

  // Αυτόματο format κατά την είσοδο
  useEffect(() => {
    handleFormat();
  }, []);

  const handleFormat = () => {
    try {
      const formatted = format(input, {
        language: "sql",
        keywordCase: "upper",
      });
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError("Invalid SQL query");
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const minified = input.replace(/\s+/g, " ").trim();
      setOutput(minified);
      setError(null);
    } catch (err) {
      setError("Error minifying SQL");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <ToolLayout
      header={
        <div>
          <h1>SQL Formatter</h1>
          <p>
            Clean up your SQL queries and make them readable with auto-uppercase
            keywords.
          </p>
          {error && <div className="error-badge">{error}</div>}
        </div>
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder="Paste your SQL query here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      }
      output={
        <textarea
          className="tool-textarea"
          placeholder="Formatted SQL will appear here..."
          value={output}
          readOnly
        />
      }
      actions={
        <div className="tool-actions">
          <button onClick={handleFormat} className="btn btn-primary">
            Format SQL
          </button>
          <button onClick={handleMinify} className="btn btn-secondary">
            Minify
          </button>
          <button
            onClick={() => copy(output)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!output}
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
          <button onClick={handleClear} className="btn btn-danger">
            Clear
          </button>
        </div>
      }
    />
  );
}
