import { useState, useEffect } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { encodeUrl, decodeUrl } from "../../utils/url";

const EXAMPLE_URL_TEXT =
  "https://transformjs.com/search?query=hello world & dev=true";

export default function UrlEncoderDecoder({ tips }) {
  const [text, setText] = useState(EXAMPLE_URL_TEXT);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const { copied, copy } = useCopy();

  useEffect(() => {
    handleProcess();
  }, []);

  const isUrlEncoded = (str) => {
    if (!str || str.trim() === "") return false;
    try {
      return decodeURIComponent(str) !== str;
    } catch (err) {
      return false;
    }
  };

  const handleProcess = () => {
    setError(null);
    setInfo(null);

    //empty input feedback
    if (!text || text.trim() === "") {
      setInfo("Please enter text to encode/decode");
      setResult("");
      return;
    }

    try {
      if (mode === "encode") {
        if (isUrlEncoded(text)) {
          setError(
            "Action Blocked: This URL is already encoded. Switch to Decode mode instead.",
          );
          setResult("");
          return;
        }
        setResult(encodeUrl(text));
      } else {
        setResult(decodeUrl(text));
      }
    } catch (err) {
      setError("Invalid input for " + mode);
      setResult("");
    }
  };

  const toggleMode = (newMode) => {
    if (newMode === mode) return;

    const nextInput = result || text;
    const nextMode = newMode;

    setMode(nextMode);
    setText(nextInput);
    setError(null);
    setInfo(null);

    try {
      if (nextInput) {
        if (nextMode === "encode" && isUrlEncoded(nextInput)) {
          setResult("");
          setError(
            "Input is already encoded. Verify if you need DECODE instead.",
          );
          return;
        }

        const newResult =
          nextMode === "encode" ? encodeUrl(nextInput) : decodeUrl(nextInput);
        setResult(newResult);
      }
    } catch (err) {
      setResult("");
    }
  };

  const handleClear = () => {
    setText("");
    setResult("");
    setError(null);
    setInfo(null);
  };

  return (
    <ToolLayout
      header={
        <div>
          <h1>URL Encoder / Decoder</h1>
          <p>RFC 3986 compliant encoding and decoding for URL components.</p>

          {/*mode indicator like base64*/}
          <div className={`mode-indicator ${mode}`}>
            Current Mode:{" "}
            <strong>
              {mode === "encode"
                ? "Encode (Paste your text)"
                : "Decode (Paste your encoded URL)"}
            </strong>
          </div>

          {/*global warning*/}
          {mode === "encode" && isUrlEncoded(text) && (
            <div className="input-warning">
              Warning: Input is already URL encoded. Switch to{" "}
              <strong>Decode </strong>
              mode.
            </div>
          )}

          {/*empty input info message */}
          {info && (
            <div
              style={{
                marginTop: "12px",
                padding: "10px 14px",
                background: "rgba(59, 130, 246, 0.08)",
                border: "1px solid rgba(59, 130, 246, 0.35)",
                borderRadius: "6px",
                color: "#60a5fa",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{info}</span>
            </div>
          )}

          {error && <div className="error-badge">{error}</div>}
          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder={
            mode === "encode" ? "Enter text..." : "Enter URL encoded text..."
          }
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            //clear info as soon as user starts typing
            if (info) setInfo(null);
          }}
        />
      }
      output={
        <textarea
          className="tool-textarea"
          placeholder="Result will appear here..."
          value={result}
          readOnly
        />
      }
      actions={
        <div className="tool-actions">
          {/*toogle mode ,for switching modes*/}
          <button
            className={`btn ${mode === "encode" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => toggleMode("encode")}
          >
            Encode
          </button>

          <button
            className={`btn ${mode === "decode" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => toggleMode("decode")}
          >
            Decode
          </button>

          <button onClick={handleProcess} className="btn btn-primary">
            Run
          </button>

          <button
            onClick={() => copy(result)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!result}
          >
            {copied ? "Copied" : "Copy"}
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
