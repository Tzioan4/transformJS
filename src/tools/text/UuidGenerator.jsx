import { useState, useCallback } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import "../../styles/tools/uuid.css";

function generateUUID() {
  if (crypto.randomUUID) return crypto.randomUUID();

  //fallbackfor old browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator({ tips }) {
  const [uuids, setUuids] = useState(() => [generateUUID()]);
  const [count, setCount] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleGenerate = useCallback(() => {
    setUuids(Array.from({ length: count }, generateUUID));
    setCopiedIndex(null);
    setCopiedAll(false);
  }, [count]);

  const handleCopy = async (uuid, index) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("copy failed:", err);
    }
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error("copy failed:", err);
    }
  };

  return (
    <ToolLayout
      header={
        <div>
          <h1>UUID Generator</h1>
          <p>Generate cryptographically secure UUID v4 identifiers.</p>
          <div
            className="status-badge status-pretty"
            style={{ marginTop: 12, display: "inline-block" }}
          >
            VERSION: <strong>v4</strong>
          </div>
          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <div className="tool-textarea uuid-controls">
          <div className="uuid-count-row">
            <label className="uuid-label">Number of UUIDs</label>
            <div className="uuid-count-input-row">
              <button
                className="uuid-count-btn"
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                disabled={count <= 1}
              >
                −
              </button>
              <input
                type="number"
                className="uuid-count-input"
                min={1}
                max={100}
                value={count}
                onChange={(e) => {
                  const val = Math.min(
                    100,
                    Math.max(1, Number(e.target.value)),
                  );
                  setCount(val);
                }}
              />
              <button
                className="uuid-count-btn"
                onClick={() => setCount((c) => Math.min(100, c + 1))}
                disabled={count >= 100}
              >
                +
              </button>
            </div>
          </div>

          <div className="uuid-info-box">
            <p className="uuid-info-title">UUID v4</p>
            <p className="uuid-info-desc">
              Generated using <code>crypto.randomUUID()</code> —
              cryptographically secure and unique. Format:{" "}
              <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>
            </p>
          </div>
        </div>
      }
      output={
        <div className="tool-textarea uuid-output-wrapper">
          <div className="uuid-list">
            {uuids.map((uuid, i) => (
              <div key={i} className="uuid-row">
                <span className="uuid-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <code className="uuid-value">{uuid}</code>
                <button
                  className="uuid-copy-btn"
                  onClick={() => handleCopy(uuid, i)}
                >
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      }
      actions={
        <div className="tool-actions">
          <button onClick={handleGenerate} className="btn btn-primary">
            Generate
          </button>
          <button
            onClick={handleCopyAll}
            className={`btn ${copiedAll ? "btn-success" : "btn-copy"}`}
            disabled={uuids.length === 0}
          >
            {copiedAll ? "Copied" : "Copy All"}
            <span className="btn-hint">Ctrl+Shift+C</span>
          </button>
          <button
            onClick={() => {
              setUuids([]);
              setCount(1);
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
