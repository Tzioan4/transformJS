import { useState, useEffect, useMemo } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import "../../styles/tools/regex.css";

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHighlightedHtml(text, matches) {
  if (!matches.length) return escapeHtml(text);
  const parts = [];
  let lastIndex = 0;
  for (const match of matches) {
    const start = match.index;
    const end = start + match[0].length;
    if (start > lastIndex) parts.push(escapeHtml(text.slice(lastIndex, start)));
    parts.push(
      `<mark style="background:rgba(247,223,30,0.25);color:#F7DF1E;border-bottom:2px solid #F7DF1E;padding:0 1px;border-radius:2px;">${escapeHtml(match[0])}</mark>`,
    );
    lastIndex = end;
  }
  if (lastIndex < text.length) parts.push(escapeHtml(text.slice(lastIndex)));
  return parts.join("");
}

export default function RegexTester({ tips }) {
  const [pattern, setPattern] = useState(
    "([a-z0-9_.-]+)@([\\da-z.-]+)\\.([a-z.]{2,6})",
  );
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "Contact us at support@transformjs.com or dev_team@gmail.com",
  );
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pattern || !text) {
      setMatches([]);
      setError(null);
      return;
    }
    try {
      const safeFlags = flags.includes("g") ? flags : flags + "g";
      const regex = new RegExp(pattern, safeFlags);
      setMatches([...text.matchAll(regex)]);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMatches([]);
    }
  }, [pattern, flags, text]);

  const highlightedHtml = useMemo(
    () => buildHighlightedHtml(text, matches),
    [text, matches],
  );

  return (
    <ToolLayout
      header={
        <div>
          <h1>RegEx Tester</h1>
          <p>
            Test regular expressions with real time match highlighting and flag
            support.
          </p>
          {matches.length > 0 && !error && (
            <div
              className="status-badge status-pretty"
              style={{ marginTop: 12, display: "inline-block" }}
            >
              MATCHES FOUND: <strong>{matches.length}</strong>
            </div>
          )}
          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <div
          className="tool-textarea"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            overflowY: "auto",
          }}
        >
          <div>
            <label className="regex-label">Regex Pattern & Flags</label>
            <div className="regex-pattern-bar">
              <span className="regex-slash">/</span>
              <input
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="regex-pattern-input"
                placeholder="Enter pattern..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
              <span className="regex-slash">/</span>
              <input
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="regex-flags-input"
                placeholder="gim"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
              />
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label className="regex-label">Test String</label>
            <textarea
              className="regex-test-input"
              placeholder="Type text to test against regex..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {error && (
            <div className="error-badge" style={{ wordBreak: "break-word" }}>
              {error}
            </div>
          )}
        </div>
      }
      output={
        <div
          className="tool-textarea"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            overflowY: "auto",
          }}
        >
          <div>
            <label className="regex-label">Highlighted Preview</label>
            <div className="regex-highlight-box">
              <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            <label className="regex-label">Match Details</label>
            {matches.length === 0 ? (
              <p className="regex-no-match">No matches found.</p>
            ) : (
              matches.map((match, i) => (
                <div key={i} className="regex-match-card">
                  <div className="regex-match-title">Match {i + 1}</div>
                  <div className="regex-match-value">
                    Value: <code>{match[0]}</code>
                  </div>
                  <div className="regex-match-index">
                    Index: {match.index} — End: {match.index + match[0].length}
                  </div>
                  {match.length > 1 && (
                    <div
                      style={{
                        marginTop: "5px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "4px",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#666" }}>
                        Groups:{" "}
                      </span>
                      {match.slice(1).map((g, gi) => (
                        <span
                          key={gi}
                          className="regex-group-badge"
                          style={{
                            color: g === undefined ? "#555" : undefined,
                          }}
                        >
                          {g === undefined ? "∅" : g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      }
      actions={
        <div className="tool-actions">
          <button
            onClick={() => {
              setText("");
              setMatches([]);
            }}
            className="btn btn-danger"
          >
            Clear <span className="btn-hint">Esc</span>
          </button>
        </div>
      }
    />
  );
}
