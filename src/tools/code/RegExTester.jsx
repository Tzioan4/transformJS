import { useEffect, useMemo, useRef, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import "../../styles/tools/regex.css";

const TIMEOUT_MS = 2000;

function buildHighlightedParts(text, matches) {
  if (!matches.length) return [text];

  const parts = [];
  let lastIndex = 0;

  matches.forEach((match, index) => {
    const start = match.index;
    const end = start + match.value.length;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    parts.push(
      <mark className="regex-highlight" key={`${start}-${index}`}>
        {match.value}
      </mark>,
    );

    lastIndex = end;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
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

  const highlightedParts = useMemo(
    () => buildHighlightedParts(text, matches),
    [text, matches],
  );

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!pattern || !text) return;

    const worker = new Worker("/regexWorker.js");
    workerRef.current = worker;

    timeoutRef.current = setTimeout(() => {
      worker.terminate();

      if (workerRef.current === worker) {
        workerRef.current = null;
      }

      timeoutRef.current = null;

      setIsRunning(false);
      setMatches([]);
      setRuntimeError(
        "Regex execution timeout! Possible catastrophic backtracking detected. Simplify your pattern.",
      );
    }, TIMEOUT_MS);

    worker.onmessage = (e) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      worker.terminate();

      if (workerRef.current === worker) {
        workerRef.current = null;
      }

      setIsRunning(false);

      if (e.data.type === "success") {
        setMatches(e.data.matches);
        setRuntimeError(null);
        return;
      }

      setMatches([]);
      setRuntimeError(e.data.message);
    };

    worker.onerror = (e) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      worker.terminate();

      if (workerRef.current === worker) {
        workerRef.current = null;
      }

      setIsRunning(false);
      setMatches([]);
      setRuntimeError(e.message || "Unknown error in regex worker.");
    };

    worker.postMessage({ pattern, flags, text });

    return () => {
      worker.terminate();

      if (workerRef.current === worker) {
        workerRef.current = null;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [pattern, flags, text]);
  function prepareRun(nextPattern, nextText) {
    if (!nextPattern || !nextText) {
      setMatches([]);
      setRuntimeError(null);
      setIsRunning(false);
      return;
    }

    setRuntimeError(null);
    setIsRunning(true);
  }
  function handlePatternChange(e) {
    const nextPattern = e.target.value;

    prepareRun(nextPattern, text);
    setPattern(nextPattern);
  }

  function handleFlagsChange(e) {
    prepareRun(pattern, text);
    setFlags(e.target.value);
  }

  function handleTextChange(e) {
    const nextText = e.target.value;

    prepareRun(pattern, nextText);
    setText(nextText);
  }

  function handleClear() {
    setText("");
    setMatches([]);
    setRuntimeError(null);
    setIsRunning(false);
  }

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

          {matches.length > 0 && !runtimeError && !isRunning && (
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
            <label className="regex-label" htmlFor="regex-pattern">
              Regex Pattern & Flags
            </label>

            <div className="regex-pattern-bar">
              <span className="regex-slash">/</span>

              <input
                id="regex-pattern"
                name="regex-pattern"
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
                id="regex-flags"
                name="regex-flags"
                type="text"
                aria-label="Regex flags"
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
            <label className="regex-label" htmlFor="regex-test-string">
              Test String
            </label>

            <textarea
              id="regex-test-string"
              name="regex-test-string"
              className="regex-test-input"
              placeholder="Type text to test against regex..."
              value={text}
              onChange={handleTextChange}
            />
          </div>

          {runtimeError && <div className="error-badge">{runtimeError}</div>}
        </div>
      }
      output={
        <div className="tool-textarea regex-panel">
          <div>
            <div className="regex-label">Highlighted Preview</div>

            <div className="regex-highlight-box">
              <div>{highlightedParts}</div>
            </div>
          </div>

          <div className="regex-matches-list">
            <div className="regex-label">Match Details</div>

            {isRunning ? (
              <p className="regex-no-match">Running...</p>
            ) : matches.length === 0 ? (
              <p className="regex-no-match">No matches found.</p>
            ) : (
              matches.map((match, index) => (
                <div
                  key={`${match.index}-${index}`}
                  className="regex-match-card"
                >
                  <div className="regex-match-title">Match {index + 1}</div>

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
