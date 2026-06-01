import { useState, useMemo } from "react";
import ToolInfo from "../../components/ToolInfo";
import DropOverlay from "../../components/DropOverlay";
import { readTextFile } from "../../utils/file";
import { TEXT_FILE_TYPES, FILE_SIZE_LIMIT } from "../../constants/fileTypes";
import "@styles/tools/diff.css";

export function computeDiff(a, b) {
  const linesA = a.split("\n");
  const linesB = b.split("\n");

  const m = linesA.length;
  const n = linesB.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      result.push({ type: "same", text: linesA[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ type: "added", text: linesB[j - 1] });
      j--;
    } else {
      result.push({ type: "removed", text: linesA[i - 1] });
      i--;
    }
  }

  return result.reverse();
}

export default function DiffChecker({ tips }) {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [error, setError] = useState(null);
  const [leftDragging, setLeftDragging] = useState(false);
  const [rightDragging, setRightDragging] = useState(false);

  const diff = useMemo(() => computeDiff(left, right), [left, right]);

  const added = diff.filter((line) => line.type === "added").length;
  const removed = diff.filter((line) => line.type === "removed").length;
  const unchanged = diff.filter((line) => line.type === "same").length;

  const hasContent = left.length > 0 || right.length > 0;
  const isIdentical = added === 0 && removed === 0 && hasContent;

  const leftLines = diff.filter((line) => line.type !== "added");
  const rightLines = diff.filter((line) => line.type !== "removed");

  const handleFileLoad = async (file, side) => {
    if (!file) return;

    try {
      const text = await readTextFile(file, {
        allowedExtensions: TEXT_FILE_TYPES,
        maxSize: FILE_SIZE_LIMIT,
      });

      if (side === "left") {
        setLeft(text);
      } else {
        setRight(text);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClear = () => {
    setLeft("");
    setRight("");
    setError(null);
    setLeftDragging(false);
    setRightDragging(false);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <span className="tool-category-badge">Code</span>
        <h1>Diff Checker</h1>
        <p>
          Compare two text blocks or local files and highlight the differences
          line by line.
        </p>

        {error && <div className="error-badge">{error}</div>}

        {tips && <ToolInfo tips={tips} />}
      </div>

      <div className="tool-workspace">
        <div
          className={`diff-panel file-drop-wrap ${
            leftDragging ? "dragging" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setLeftDragging(true);
          }}
          onDragLeave={() => setLeftDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setLeftDragging(false);
            handleFileLoad(e.dataTransfer.files[0], "left");
          }}
        >
          {leftDragging && <DropOverlay label="Drop original file here" />}

          <span className="diff-panel-label">Original</span>

          <textarea
            className="tool-textarea"
            value={left}
            onChange={(e) => {
              setLeft(e.target.value);
              setError(null);
            }}
            placeholder="Paste original text, upload a file, or drag and drop it."
            spellCheck={false}
          />

          <label className="file-load-btn">
            Load file
            <input
              type="file"
              accept={TEXT_FILE_TYPES.join(",")}
              onChange={(e) => handleFileLoad(e.target.files[0], "left")}
            />
          </label>
        </div>

        <div
          className={`diff-panel file-drop-wrap ${
            rightDragging ? "dragging" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setRightDragging(true);
          }}
          onDragLeave={() => setRightDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setRightDragging(false);
            handleFileLoad(e.dataTransfer.files[0], "right");
          }}
        >
          {rightDragging && <DropOverlay label="Drop modified file here" />}

          <span className="diff-panel-label">Modified</span>

          <textarea
            className="tool-textarea"
            value={right}
            onChange={(e) => {
              setRight(e.target.value);
              setError(null);
            }}
            placeholder="Paste modified text, upload a file, or drag and drop it."
            spellCheck={false}
          />

          <label className="file-load-btn">
            Load file
            <input
              type="file"
              accept={TEXT_FILE_TYPES.join(",")}
              onChange={(e) => handleFileLoad(e.target.files[0], "right")}
            />
          </label>
        </div>
      </div>

      {isIdentical ? (
        <div
          style={{
            padding: "14px 18px",
            background: "rgba(34, 197, 94, 0.08)",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            borderRadius: "var(--radius-md)",
            color: "#4ade80",
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <span>
            <strong>Texts are identical</strong> — no differences found
          </span>
        </div>
      ) : (
        <div className="diff-stats">
          <span className="diff-stat diff-stat--added">+{added} added</span>
          <span className="diff-stat diff-stat--removed">
            −{removed} removed
          </span>
          <span className="diff-stat diff-stat--same">
            {unchanged} unchanged
          </span>
        </div>
      )}

      <div className="diff-output">
        <div className="diff-output-panel">
          <span className="diff-panel-label">Original</span>

          <div className="diff-lines">
            {leftLines.map((line, index) => (
              <div key={index} className={`diff-line diff-line--${line.type}`}>
                <span className="diff-line-gutter">
                  {line.type === "removed" ? "−" : " "}
                </span>
                <span className="diff-line-text">{line.text || "\u00A0"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="diff-output-panel">
          <span className="diff-panel-label">Modified</span>

          <div className="diff-lines">
            {rightLines.map((line, index) => (
              <div key={index} className={`diff-line diff-line--${line.type}`}>
                <span className="diff-line-gutter">
                  {line.type === "added" ? "+" : " "}
                </span>
                <span className="diff-line-text">{line.text || "\u00A0"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tool-actions">
        <button className="btn btn-danger" onClick={handleClear}>
          Clear <span className="btn-hint">Esc</span>
        </button>
      </div>
    </div>
  );
}
