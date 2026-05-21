import { useState, useMemo } from "react";
import ToolInfo from "../../components/ToolInfo";
import "@styles/tools/diff.css";

function computeDiff(a, b) {
  const linesA = a.split("\n");
  const linesB = b.split("\n");

  const m = linesA.length;
  const n = linesB.length;

  //LCS via DP
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

  //backtrack to build diff
  const result = [];
  let i = m,
    j = n;
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

const EXAMPLE_A = `function greet(name) {
  console.log("Hello, " + name);
  return true;
}`;

const EXAMPLE_B = `function greet(name, greeting = "Hello") {
  console.log(greeting + ", " + name + "!");
  return name;
}`;

export default function DiffChecker({ tips }) {
  const [left, setLeft] = useState(EXAMPLE_A);
  const [right, setRight] = useState(EXAMPLE_B);

  const diff = useMemo(() => computeDiff(left, right), [left, right]);

  const added = diff.filter((l) => l.type === "added").length;
  const removed = diff.filter((l) => l.type === "removed").length;
  const unchanged = diff.filter((l) => l.type === "same").length;

  //texts are considered identical when no additions/removals
  //AND at least one panel has content (to avoid showing banner in empty state)
  const hasContent = left.length > 0 || right.length > 0;
  const isIdentical = added === 0 && removed === 0 && hasContent;

  const leftLines = diff.filter((l) => l.type !== "added");
  const rightLines = diff.filter((l) => l.type !== "removed");

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>Diff Checker</h1>
        <p>
          Compare two text blocks and highlight the differences line by line.
        </p>
        {tips && <ToolInfo tips={tips} />}
      </div>

      {/*inputs */}
      <div className="tool-workspace">
        <div className="diff-panel">
          <span className="diff-panel-label">Original</span>
          <textarea
            className="tool-textarea"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="Paste original text..."
            spellCheck={false}
          />
        </div>
        <div className="diff-panel">
          <span className="diff-panel-label">Modified</span>
          <textarea
            className="tool-textarea"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Paste modified text..."
            spellCheck={false}
          />
        </div>
      </div>

      {/*identical banner OR stats */}
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
          <span style={{ fontSize: "1.1rem" }}></span>
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

      {/*output */}
      <div className="diff-output">
        <div className="diff-output-panel">
          <span className="diff-panel-label">Original</span>
          <div className="diff-lines">
            {leftLines.map((line, i) => (
              <div key={i} className={`diff-line diff-line--${line.type}`}>
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
            {rightLines.map((line, i) => (
              <div key={i} className={`diff-line diff-line--${line.type}`}>
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
        <button
          className="btn btn-danger"
          onClick={() => {
            setLeft("");
            setRight("");
          }}
        >
          Clear <span className="btn-hint">Esc</span>
        </button>
      </div>
    </div>
  );
}
