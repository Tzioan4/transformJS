import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import "../../styles/tools/case.css";
import ToolInfo from "../../components/ToolInfo";

//converters
export function toWords(input) {
  return (
    input
      .trim()
      //strip non-alphanumeric chars except whitespace, underscore, hyphen
      //this prevents !@#$% from polluting the output identifiers
      .replace(/[^a-zA-Z0-9\s_-]/g, "")
      //split on spaces, underscores, hyphens
      .replace(/([a-z])([A-Z])/g, "$1 $2") //camelCase / PascalCase to words
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") //ABCDef to ABC Def
      .replace(/[-_]+/g, " ") //snake_case /kebab-case to words
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.toLowerCase())
  );
}

const CASES = [
  {
    key: "camel",
    label: "camelCase",
    convert: (words) =>
      words
        .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
        .join(""),
  },
  {
    key: "pascal",
    label: "PascalCase",
    convert: (words) =>
      words.map((w) => w[0].toUpperCase() + w.slice(1)).join(""),
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
      words.map((w) => w[0].toUpperCase() + w.slice(1)).join(" "),
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

//component
export default function CaseConverter({ tips }) {
  const [input, setInput] = useState("hello world example");
  const [copiedKey, setCopiedKey] = useState(null);

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

  return (
    <ToolLayout
      header={
        <div>
          <h1>Case Converter</h1>
          <p>
            Convert text between camelCase, snake_case, kebab-case, PascalCase
            and more.
          </p>
          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <div
          className="tool-textarea"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <label className="case-label">Input</label>
          <textarea
            className="case-input"
            placeholder="Type or paste your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />
          {!hasInput && input.length > 0 && (
            <div className="error-badge">Could not parse input.</div>
          )}
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
        </div>
      }
      actions={
        <div className="tool-actions">
          <button onClick={() => setInput("")} className="btn btn-danger">
            Clear <span className="btn-hint">Esc</span>
          </button>
        </div>
      }
    />
  );
}
