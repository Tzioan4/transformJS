import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import "../../styles/tools/urlparser.css";

const EXAMPLE_URL =
  "https://transformjs.com:8080/tools/search?query=hello+world&page=2&debug=true#results";

//detects whether the raw URL string contains an explicit port (e.g. ":8080")
//returns the port string if explicit, or null otherwise.
//handles userinfo (user:pass@host) and IPv6 ([::1]:8080) edge cases.
export function extractExplicitPort(raw) {
  try {
    //strip protocol: "https://x:8080/..." → "x:8080/..."
    const afterProtocol = raw.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//, "");

    //isolate host segment: cut at first /, ?, or #
    const hostSegment = afterProtocol.split(/[/?#]/)[0];

    //strip userinfo if present: "user:pass@host:port" → "host:port"
    const hostAndPort = hostSegment.includes("@")
      ? hostSegment.substring(hostSegment.lastIndexOf("@") + 1)
      : hostSegment;

    //IPv6 case: "[::1]:8080" → port is after "]:"
    if (hostAndPort.startsWith("[")) {
      const match = hostAndPort.match(/]:(\d+)$/);
      return match ? match[1] : null;
    }

    //regular case: "host:8080" → port after final ":"
    const colonIdx = hostAndPort.lastIndexOf(":");
    if (colonIdx === -1) return null;

    const portStr = hostAndPort.substring(colonIdx + 1);
    //validate it's actually numeric (avoids matching weird inputs)
    return /^\d+$/.test(portStr) ? portStr : null;
  } catch {
    return null;
  }
}

function parseUrl(raw) {
  try {
    const url = new URL(raw);
    const params = [];
    url.searchParams.forEach((value, key) => {
      params.push({ key, value });
    });

    const explicitPort = extractExplicitPort(raw);

    return {
      protocol: url.protocol.replace(":", ""),
      host: url.hostname,
      port: explicitPort || "—",
      pathname: decodeURIComponent(url.pathname),
      search: url.search,
      hash: url.hash.replace("#", ""),
      username: url.username || null,
      password: url.password || null,
      params,
      origin: url.origin,
      error: null,
    };
  } catch {
    return {
      error:
        "Invalid URL — make sure it includes a valid protocol (http://, https://, ftp://...)",
    };
  }
}

function Field({ label, value, empty = false, sensitive = false }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={`urlp-field ${empty ? "urlp-field-empty" : ""}`}>
      <span className="urlp-field-label">{label}</span>
      <code className="urlp-field-value">
        {sensitive && !revealed ? "••••••••" : value || "—"}
      </code>
      {sensitive && (
        <button
          className="urlp-copy-btn"
          onClick={() => setRevealed((r) => !r)}
        >
          {revealed ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
}

export default function UrlParser({ tips }) {
  const [input, setInput] = useState(EXAMPLE_URL);
  const [copiedKey, setCopiedKey] = useState(null);

  const parsed = parseUrl(input);

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("copy failed:", err);
    }
  };

  const handleClear = () => setInput("");

  return (
    <ToolLayout
      header={
        <div>
          <h1>URL Parser</h1>
          <p>Break down any URL into its individual components instantly.</p>
          {!parsed.error && input && (
            <div
              className="status-badge status-pretty"
              style={{ marginTop: 12, display: "inline-block" }}
            >
              STATUS: <strong>PARSED</strong>
            </div>
          )}
          {parsed.error && input && (
            <div className="error-badge" style={{ marginTop: 12 }}>
              {parsed.error}
            </div>
          )}
          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <div
          className="tool-textarea"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <label className="urlp-label">URL Input</label>
          <input
            type="text"
            className="urlp-input"
            placeholder="https://example.com/path?query=value#hash"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
          <div className="urlp-info">
            <span className="urlp-info-label">STRUCTURE</span>
            <code className="urlp-info-value">
              protocol://username:password@host:port/pathname?search#hash
            </code>
          </div>
        </div>
      }
      output={
        <div
          className="tool-textarea urlp-output"
          style={{ overflowY: "auto" }}
        >
          {!input && (
            <p className="urlp-empty">Paste a URL to see its components.</p>
          )}

          {input && !parsed.error && (
            <>
              <div className="urlp-section">
                <span className="urlp-section-title">COMPONENTS</span>
                <div className="urlp-fields">
                  <Field label="Protocol" value={parsed.protocol} />
                  <Field label="Host" value={parsed.host} />
                  <Field
                    label="Port"
                    value={parsed.port}
                    empty={parsed.port === "—"}
                  />
                  <Field
                    label="Pathname"
                    value={parsed.pathname}
                    empty={parsed.pathname === "/"}
                  />
                  <Field
                    label="Hash"
                    value={parsed.hash}
                    empty={!parsed.hash}
                  />
                  <Field label="Origin" value={parsed.origin} />
                  {parsed.username && (
                    <Field label="Username" value={parsed.username} />
                  )}
                  {parsed.password && (
                    <Field
                      label="Password"
                      value={parsed.password}
                      sensitive={true}
                    />
                  )}
                </div>
              </div>

              {parsed.params.length > 0 && (
                <div className="urlp-section">
                  <span className="urlp-section-title">
                    QUERY PARAMS ({parsed.params.length})
                  </span>
                  <div className="urlp-params">
                    {parsed.params.map(({ key, value }, i) => (
                      <div key={i} className="urlp-param-row">
                        <code className="urlp-param-key">{key}</code>
                        <span className="urlp-param-eq">=</span>
                        <code className="urlp-param-value">{value}</code>
                        <button
                          className="urlp-copy-btn"
                          onClick={() => handleCopy(`${key}=${value}`, i)}
                        >
                          {copiedKey === i ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {parsed.params.length === 0 && (
                <div className="urlp-section">
                  <span className="urlp-section-title">QUERY PARAMS</span>
                  <p className="urlp-empty">No query parameters found.</p>
                </div>
              )}
            </>
          )}
        </div>
      }
      actions={
        <div className="tool-actions">
          <button
            onClick={() => handleCopy(input, "full")}
            className={`btn ${copiedKey === "full" ? "btn-success" : "btn-copy"}`}
            disabled={!input || !!parsed.error}
          >
            {copiedKey === "full" ? "Copied!" : "Copy URL"}{" "}
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
