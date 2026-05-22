import { useState, useEffect } from "react";
import { format } from "sql-formatter";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";

const SQL_EXAMPLE =
  "select id, name, email from users where active = 1 and created_at > '2024-01-01' order by name asc limit 10;";

export function detectDestructiveKeywords(sql) {
  if (!sql) return [];

  //strip single-line comments (-- ...) and block comments (/* ... */)
  //so we don't false-positive on "-- DROP this column later"
  const stripped = sql
    .replace(/--[^\n]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  //strip string literals so 'DELETE me' inside a string doesn't trigger
  const noStrings = stripped.replace(/'(?:[^'\\]|\\.)*'/g, "''");

  const found = new Set();
  const globalRegex = /\b(DROP|DELETE|TRUNCATE|ALTER)\b/gi;
  let match;
  while ((match = globalRegex.exec(noStrings)) !== null) {
    found.add(match[1].toUpperCase());
  }

  return Array.from(found);
}

export default function SqlFormatter({ tips }) {
  const [input, setInput] = useState(SQL_EXAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [isMinified, setIsMinified] = useState(false);

  const { copied, copy } = useCopy();

  const destructiveKeywords = detectDestructiveKeywords(input);

  useEffect(() => {
    handleFormat();
  }, []);

  const handleFormat = () => {
    try {
      if (!input) return;

      const formatted = format(input, {
        language: "sql",
        keywordCase: "upper",
        tabWidth: 2,
        useTabs: false,
      });

      const cleanOutput = formatted
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n");

      setOutput(cleanOutput);
      setIsMinified(false);
      setError(null);
    } catch (err) {
      setError("SQL Error: " + err.message);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      if (!input) return;

      const minified = format(input, {
        language: "sql",
        keywordCase: "upper",
      })
        .replace(/\s+/g, " ")
        .trim();

      setOutput(minified);
      setIsMinified(true);
      setError(null);
    } catch (err) {
      setError("Error minifying SQL");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setIsMinified(false);
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

          {output && !error && (
            <div
              className={`status-badge ${isMinified ? "status-min" : "status-pretty"}`}
              style={{
                marginTop: "10px",
                display: "inline-block",
                padding: "2px 8px",
                fontSize: "11px",
                borderRadius: "4px",
                textTransform: "uppercase",
                fontWeight: "600",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.05em",
              }}
            >
              STATUS: {isMinified ? "Minified" : "Formatted"}
            </div>
          )}

          {/*destructive keywords warning */}
          {destructiveKeywords.length > 0 && (
            <div
              style={{
                marginTop: "12px",
                padding: "10px 14px",
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                borderRadius: "6px",
                color: "#fbbf24",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                lineHeight: "1.5",
              }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>WARNING</span>
              <span>
                <strong>Destructive SQL detected:</strong>{" "}
                {destructiveKeywords.join(", ")}. Review carefully before
                executing on production databases.
              </span>
            </div>
          )}

          {error && <div className="error-badge">{error}</div>}
          {tips && <ToolInfo tips={tips} />}
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
            {copied ? "Copied" : "Copy Output"}
            <span className="btn-hint">Ctrl+Shift+C</span>
          </button>
          <button onClick={handleClear} className="btn btn-danger">
            Clear <span className="btn-hint">Esc</span>
          </button>
        </div>
      }
    />
  );
}
