import { useState, useEffect, useMemo } from "react";
import ToolLayout from "../../layouts/ToolLayout";

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

export default function RegexTester() {
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
            Test regular expressions with real-time match highlighting and flag
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
          {/*pattern and flags*/}
          <div>
            <label
              style={{
                color: "#888",
                fontSize: "12px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Regex Pattern & Flags
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#121212",
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "4px 12px",
              }}
            >
              <span
                style={{
                  color: "#555",
                  fontFamily: "monospace",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}
              >
                /
              </span>
              <input
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  color: "#ffffff",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px",
                  padding: "10px 6px",
                  outline: "none",
                  minWidth: 0,
                }}
                placeholder="Enter pattern..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
              <span
                style={{
                  color: "#555",
                  fontFamily: "monospace",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}
              >
                /
              </span>
              <input
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                style={{
                  width: "52px",
                  background: "transparent",
                  border: "none",
                  borderLeft: "1px solid #333",
                  color: "#ffffff",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px",
                  textAlign: "center",
                  padding: "10px 4px",
                  outline: "none",
                  flexShrink: 0,
                }}
                placeholder="gim"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
              />
            </div>
          </div>

          {/*test string*/}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label
              style={{
                color: "#888",
                fontSize: "12px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Test String
            </label>
            <textarea
              style={{
                flex: 1,
                background: "transparent",
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "12px",
                color: "#e2e8f0",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "14px",
                outline: "none",
                resize: "none",
                lineHeight: "1.6",
              }}
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
          {/*highlighted preview*/}
          <div>
            <label
              style={{
                color: "#888",
                fontSize: "12px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Highlighted Preview
            </label>
            <div
              style={{
                background: "#0a0a0a",
                border: "1px solid #222",
                borderRadius: "8px",
                padding: "12px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                lineHeight: "1.7",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
                color: "#999",
                minHeight: "60px",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
            </div>
          </div>

          {/*match details*/}
          <div style={{ flex: 1, overflowY: "auto" }}>
            <label
              style={{
                color: "#888",
                fontSize: "12px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Match Details
            </label>
            {matches.length === 0 ? (
              <p style={{ color: "#444", fontSize: "13px" }}>
                No matches found.
              </p>
            ) : (
              matches.map((match, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(247,223,30,0.05)",
                    borderLeft: "3px solid #F7DF1E",
                    padding: "10px",
                    marginBottom: "8px",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      color: "#F7DF1E",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Match {i + 1}
                  </div>
                  <div
                    style={{
                      color: "#fff",
                      margin: "5px 0",
                      wordBreak: "break-all",
                    }}
                  >
                    Value: <code style={{ color: "#ffffff" }}>{match[0]}</code>
                  </div>
                  <div style={{ color: "#888", fontSize: "11px" }}>
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
                          style={{
                            fontSize: "11px",
                            background: "#333",
                            padding: "2px 5px",
                            borderRadius: "3px",
                            color: g === undefined ? "#555" : "#fff",
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
            Clear
          </button>
        </div>
      }
    />
  );
}
