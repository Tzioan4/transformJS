import { useState, useEffect, useMemo, useRef } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import "../../styles/tools/regex.css";

const TIMEOUT_MS = 2000;

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHighlightedHtml(text, matches) {
  if (!matches.length) return escapeHtml(text);

  const parts = [];
  let lastIndex = 0;

  for (const match of matches) {
    const start = match.index;
    const end = start + match.value.length;

    if (start > lastIndex) parts.push(escapeHtml(text.slice(lastIndex, start)));

    parts.push(
      `<mark style="background:rgba(247,223,30,0.25);color:#F7DF1E;border-bottom:2px solid #F7DF1E;padding:0 1px;border-radius:2px;">${escapeHtml(match.value)}</mark>`,
    );

    lastIndex = end;
  }

  if (lastIndex < text.length) parts.push(escapeHtml(text.slice(lastIndex)));

  return parts.join("");
}

function getRegexError(pattern, flags) {
  if (!pattern) return null;

  try {
    const safeFlags = flags.includes("g") ? flags : flags + "g";
    new RegExp(pattern, safeFlags);
    return null;
  } catch (err) {
    return err.message;
  }
}

export default function RegexTester({ tips, category }) {
  const [pattern, setPattern] = useState(
    "([a-z0-9_.-]+)@([\\da-z.-]+)\\.([a-z.]{2,6})",
  );
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "Contact us at support@transformjs.com or dev_team@gmail.com",
  );
  const [matches, setMatches] = useState([]);
  const [runtimeError, setRuntimeError] = useState(null);
  const [isRunning, setIsRunning] = useState(true);

  const workerRef = useRef(null);
  const timeoutRef = useRef(null);

  const validationError = getRegexError(pattern, flags);
  const error = validationError || runtimeError;

  useEffect(() => {
    return () => {
      if (workerRef.current) workerRef.current.terminate();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!pattern || !text || validationError) return;

    const worker = new Worker("/regexWorker.js");
    workerRef.current = worker;

    timeoutRef.current = setTimeout(() => {
      worker.terminate();
      workerRef.current = null;
      setIsRunning(false);
      setMatches([]);
      setRuntimeError(
        "Regex execution timeout! possible catastrophic backtracking detected. Simplify your pattern.",
      );
    }, TIMEOUT_MS);

    worker.onmessage = (e) => {
      clearTimeout(timeoutRef.current);
      workerRef.current = null;
      setIsRunning(false);

      if (e.data.type === "success") {
        setMatches(e.data.matches);
        setRuntimeError(null);
      } else {
        setRuntimeError(e.data.message);
        setMatches([]);
      }
    };

    worker.onerror = (e) => {
      clearTimeout(timeoutRef.current);
      workerRef.current = null;
      setIsRunning(false);
      setRuntimeError(e.message || "Unknown error in regex worker");
      setMatches([]);
    };

    worker.postMessage({ pattern, flags, text });
  }, [pattern, flags, text, validationError]);

  const prepareNextRun = (nextPattern, nextFlags, nextText) => {
    const nextError = getRegexError(nextPattern, nextFlags);

    if (!nextPattern || !nextText || nextError) {
      setMatches([]);
      setRuntimeError(null);
      setIsRunning(false);
      return;
    }

    setRuntimeError(null);
    setIsRunning(true);
  };

  const handlePatternChange = (e) => {
    const nextPattern = e.target.value;
    prepareNextRun(nextPattern, flags, text);
    setPattern(nextPattern);
  };

  const handleFlagsChange = (e) => {
    const nextFlags = e.target.value;
    prepareNextRun(pattern, nextFlags, text);
    setFlags(nextFlags);
  };

  const handleTextChange = (e) => {
    const nextText = e.target.value;
    prepareNextRun(pattern, flags, nextText);
    setText(nextText);
  };

  const handleClear = () => {
    setText("");
    setMatches([]);
    setRuntimeError(null);
    setIsRunning(false);
  };

  const highlightedHtml = useMemo(
    () => buildHighlightedHtml(text, matches),
    [text, matches],
  );

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>RegEx Tester</h1>
          <p>
            Test regular expressions with real time match highlighting and flag
            support.
          </p>

          {isRunning && (
            <div className="status-badge status-badge-running">RUNNING...</div>
          )}

          {matches.length > 0 && !error && !isRunning && (
            <div className="status-badge status-badge-spaced status-pretty">
              MATCHES FOUND: <strong>{matches.length}</strong>
            </div>
          )}

          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <div className="tool-textarea regex-panel">
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
                onChange={handlePatternChange}
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
                onChange={handleFlagsChange}
              />
            </div>
          </div>

          <div className="regex-test-area">
            <label className="regex-label">Test String</label>

            <textarea
              className="regex-test-input"
              placeholder="Type text to test against regex..."
              value={text}
              onChange={handleTextChange}
            />
          </div>

          {error && <div className="error-badge">{error}</div>}
        </div>
      }
      output={
        <div className="tool-textarea regex-panel">
          <div>
            <label className="regex-label">Highlighted Preview</label>

            <div className="regex-highlight-box">
              <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
            </div>
          </div>

          <div className="regex-matches-list">
            <label className="regex-label">Match Details</label>

            {isRunning ? (
              <p className="regex-no-match">Running...</p>
            ) : matches.length === 0 ? (
              <p className="regex-no-match">No matches found.</p>
            ) : (
              matches.map((match, i) => (
                <div key={i} className="regex-match-card">
                  <div className="regex-match-title">Match {i + 1}</div>

                  <div className="regex-match-value">
                    Value: <code>{match.value}</code>
                  </div>

                  <div className="regex-match-index">
                    Index: {match.index} — End:{" "}
                    {match.index + match.value.length}
                  </div>

                  {match.groups.length > 0 && (
                    <div className="regex-groups">
                      <span className="regex-groups-label">Groups: </span>

                      {match.groups.map((group, groupIndex) => (
                        <span
                          key={groupIndex}
                          className="regex-group-badge"
                          style={{
                            color: group === null ? "#555" : undefined,
                          }}
                        >
                          {group === null ? "∅" : group}
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
        <button onClick={handleClear} className="btn btn-danger">
          Clear <span className="btn-hint">Esc</span>
        </button>
      }
    />
  );
}