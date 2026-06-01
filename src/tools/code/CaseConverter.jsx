import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import "../../styles/tools/case.css";
import ToolInfo from "../../components/ToolInfo";
import { readTextFile } from "../../utils/file";
import DropOverlay from "../../components/DropOverlay";
import { TEXT_FILE_TYPES, FILE_SIZE_LIMIT } from "../../constants/fileTypes";

export function toWords(input) {
  return input
    .trim()
    .replace(/[^a-zA-Z0-9\s_-]/g, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

const CASES = [
  {
    key: "camel",
    label: "camelCase",
    convert: (words) =>
      words
        .map((word, index) =>
          index === 0 ? word : word[0].toUpperCase() + word.slice(1),
        )
        .join(""),
  },
  {
    key: "pascal",
    label: "PascalCase",
    convert: (words) =>
      words.map((word) => word[0].toUpperCase() + word.slice(1)).join(""),
  },
  {
    key: "snake",
    label: "snake_case",
    convert: (words) => words.join("_"),
  },
  {
    key: "screaming",
    label: "SCREAMING_SNAKE",
    convert: (words) => words.join("_").toUpperCase(),
  },
  {
    key: "kebab",
    label: "kebab-case",
    convert: (words) => words.join("-"),
  },
  {
    key: "upper_kebab",
    label: "UPPER-KEBAB",
    convert: (words) => words.join("-").toUpperCase(),
  },
  {
    key: "dot",
    label: "dot.case",
    convert: (words) => words.join("."),
  },
  {
    key: "title",
    label: "Title Case",
    convert: (words) =>
      words.map((word) => word[0].toUpperCase() + word.slice(1)).join(" "),
  },
  {
    key: "lower",
    label: "lower case",
    convert: (words) => words.join(" "),
  },
  {
    key: "upper",
    label: "UPPER CASE",
    convert: (words) => words.join(" ").toUpperCase(),
  },
];


export default function CaseConverter({ tips, category }) {
  const [input, setInput] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const words = toWords(input);
  const hasInput = words.length > 0;

  const handleCopy = async (key, text) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("copy failed:", err);
    }
  };

  const handleFileLoad = async (file) => {
    if (!file) return;

    try {
      const text = await readTextFile(file, {
        allowedExtensions: TEXT_FILE_TYPES,
        maxSize: FILE_SIZE_LIMIT,
      });

      setInput(text);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => {
    if (!hasInput) return;

    const output = CASES.map(({ label, convert }) => {
      return `${label}\n${convert(words)}\n`;
    }).join("\n");

    const blob = new Blob([output], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "case-conversions.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setError(null);
    setCopiedKey(null);
    setIsDragging(false);
  };

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>Case Converter</h1>
          <p>
            Convert text between camelCase, snake_case, kebab-case, PascalCase
            and more.
          </p>

          {error && <div className="error-badge">{error}</div>}

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
          {isDragging && <DropOverlay label="Drop file here" />}

          <div
            className="tool-textarea"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <label className="case-label">Input</label>

            <textarea
              className="case-input"
              placeholder="Type text, upload a file, or drag and drop it."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
            />

            <label className="file-load-btn">
              Load file
              <input
                type="file"
                accept={TEXT_FILE_TYPES.join(",")}
                onChange={(e) => handleFileLoad(e.target.files[0])}
              />
            </label>

            {!hasInput && input.length > 0 && (
              <div className="error-badge">Could not parse input.</div>
            )}
          </div>
        </div>
      }
      output={
        <div
          className="tool-textarea case-output-grid-wrapper"
          style={{ overflowY: "auto" }}
        >
          <div className="case-output-grid">
            {CASES.map(({ key, label, convert }) => {
              const result = hasInput ? convert(words) : "";

              return (
                <div key={key} className="case-card">
                  <span className="case-card-label">{label}</span>

                  <div className="case-card-value">
                    {result || <span className="case-card-empty">—</span>}
                  </div>

                  <button
                    className="case-card-copy"
                    onClick={() => handleCopy(key, result)}
                    disabled={!result}
                  >
                    {copiedKey === key ? "Copied" : "Copy"}
                  </button>
                </div>
              );
            })}
          </div>

          {hasInput && (
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
          <button onClick={handleClear} className="btn btn-danger">
            Clear <span className="btn-hint">Esc</span>
          </button>
        </div>
      }
    />
  );
}
