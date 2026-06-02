import { useState } from "react";
import { format } from "sql-formatter";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { readTextFile } from "../../utils/file";
import DropOverlay from "../../components/DropOverlay";

export function detectDestructiveKeywords(sql) {
  if (!sql) return [];

  const stripped = sql
    .replace(/--[^\n]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  const noStrings = stripped.replace(/'(?:[^'\\]|\\.)*'/g, "''");

  const found = new Set();
  const globalRegex = /\b(DROP|DELETE|TRUNCATE|ALTER)\b/gi;

  let match;

  while ((match = globalRegex.exec(noStrings)) !== null) {
    found.add(match[1].toUpperCase());
  }

  return Array.from(found);
}

function formatSqlInput(sql) {
  const formatted = format(sql, {
    language: "sql",
    keywordCase: "upper",
    tabWidth: 2,
    useTabs: false,
  });

  return formatted
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

export default function SqlFormatter({ tips, category }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [isMinified, setIsMinified] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { copied, copy } = useCopy();

  const destructiveKeywords = detectDestructiveKeywords(input);

  const handleFormat = () => {
    try {
      if (!input.trim()) return;

      setOutput(formatSqlInput(input));
      setIsMinified(false);
      setError(null);
    } catch (err) {
      setError("SQL Error: " + err.message);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;

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
      setError("SQL Error: " + err.message);
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setIsMinified(false);
    setIsDragging(false);
  };

  const handleFileLoad = async (file) => {
    try {
      const text = await readTextFile(file, {
        allowedExtensions: [".sql"],
        maxSize: 2 * 1024 * 1024,
      });

      const cleanText = text.trim();

      setInput(cleanText);
      setIsMinified(false);

      if (!cleanText) {
        setOutput("");
        setError("The selected SQL file is empty.");
        return;
      }

      setOutput(formatSqlInput(cleanText));
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput("");
    }
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: "text/sql",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = isMinified ? "minified.sql" : "formatted.sql";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>SQL Formatter</h1>
          <p>
            Clean up your SQL queries and make them readable with auto-uppercase
            keywords.
          </p>

          {output && !error && (
            <div
              className={`status-badge ${
                isMinified ? "status-min" : "status-pretty"
              }`}
            >
              STATUS: <strong>{isMinified ? "MINIFIED" : "FORMATTED"}</strong>
            </div>
          )}

          {error && <div className="error-badge">{error}</div>}

          {destructiveKeywords.length > 0 && (
            <div className="warning-badge">
              <span className="warning-badge-label">WARNING</span>

              <span>
                <strong>Destructive SQL detected:</strong>{" "}
                {destructiveKeywords.join(", ")}. Review carefully before
                executing on production databases.
              </span>
            </div>
          )}

          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
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
          {isDragging && <DropOverlay label="Drop .sql file here" />}
          <textarea
            className="tool-textarea"
            placeholder="Paste SQL here, upload a .sql file, or drag and drop it."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <label className="file-load-btn">
            Load .sql file
            <input
              type="file"
              accept=".sql,text/sql"
              onChange={(e) => handleFileLoad(e.target.files[0])}
            />
          </label>
        </div>
      }
      output={
        <div className="file-drop-wrap">
          <textarea
            className="tool-textarea"
            placeholder="Formatted SQL will appear here..."
            value={output}
            readOnly
          />

          {output && (
            <button
              type="button"
              className="file-download-btn"
              onClick={handleDownload}
            >
              Download
            </button>
          )}
        </div>
      }
      actions={
        <div className="tool-actions">
          <button onClick={handleFormat} className="btn btn-primary">
            Beautify
          </button>

          <button onClick={handleMinify} className="btn btn-secondary">
            Minify
          </button>

          <button
            onClick={() => copy(output)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!output}
          >
            {copied ? "Copied" : "Copy"}
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
