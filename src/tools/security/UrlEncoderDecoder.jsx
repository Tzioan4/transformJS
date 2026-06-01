import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { encodeUrl, decodeUrl } from "../../utils/url";
import { readTextFile } from "../../utils/file";
import DropOverlay from "../../components/DropOverlay";

const ALLOWED_FILE_TYPES = [
  ".txt",
  ".json",
  ".md",
  ".markdown",
  ".html",
  ".htm",
  ".css",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".sql",
  ".yaml",
  ".yml",
  ".csv",
];

export default function UrlEncoderDecoder({ tips, category }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { copied, copy } = useCopy();

  const isUrlEncoded = (str) => {
    if (!str || str.trim() === "") return false;

    try {
      return decodeURIComponent(str) !== str;
    } catch {
      return false;
    }
  };

  const handleProcess = () => {
    setError(null);
    setInfo(null);

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
    } catch {
      setError("Invalid input for " + mode);
      setResult("");
    }
  };

  const toggleMode = (newMode) => {
    if (newMode === mode) return;

    const nextInput = result || text;

    setMode(newMode);
    setText(nextInput);
    setError(null);
    setInfo(null);

    try {
      if (nextInput) {
        if (newMode === "encode" && isUrlEncoded(nextInput)) {
          setResult("");
          setError(
            "Input is already encoded. Verify if you need DECODE instead.",
          );
          return;
        }

        const newResult =
          newMode === "encode" ? encodeUrl(nextInput) : decodeUrl(nextInput);

        setResult(newResult);
      }
    } catch {
      setResult("");
    }
  };

  const handleClear = () => {
    setText("");
    setResult("");
    setError(null);
    setInfo(null);
    setIsDragging(false);
  };

  const handleFileLoad = async (file) => {
    if (!file) return;

    try {
      const loadedText = await readTextFile(file, {
        allowedExtensions: ALLOWED_FILE_TYPES,
        maxSize: 2 * 1024 * 1024,
      });

      setText(loadedText);
      setResult("");
      setError(null);
      setInfo(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const blob = new Blob([result], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = mode === "encode" ? "encoded-url.txt" : "decoded-url.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>URL Encoder / Decoder</h1>
          <p>RFC 3986 compliant encoding and decoding for URL components.</p>

          <div className={`mode-indicator ${mode}`}>
            Current Mode:{" "}
            <strong>
              {mode === "encode"
                ? "Encode (Paste your text)"
                : "Decode (Paste your encoded URL)"}
            </strong>
          </div>

          {mode === "encode" && isUrlEncoded(text) && (
            <div className="input-warning-text">
              Warning: Input is already URL encoded. Switch to{" "}
              <strong>Decode </strong>
              mode.
            </div>
          )}

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
        <div
          className={`file-drop-wrap ${isDragging ? "dragging" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileLoad(e.dataTransfer.files[0]);
          }}
        >
          {isDragging && <DropOverlay label="Drop file here" />}

          <textarea
            className="tool-textarea"
            placeholder={
              mode === "encode"
                ? "Paste text, upload a file, or drag and drop it."
                : "Paste URL encoded text, upload a file, or drag and drop it."
            }
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (info) setInfo(null);
            }}
          />

          <label className="file-load-btn">
            Load file
            <input
              type="file"
              accept={ALLOWED_FILE_TYPES.join(",")}
              onChange={(e) => handleFileLoad(e.target.files[0])}
            />
          </label>
        </div>
      }
      output={
        <div className="file-drop-wrap">
          <textarea
            className="tool-textarea"
            placeholder="Result will appear here..."
            value={result}
            readOnly
          />

          {result && (
            <button
              type="button"
              className="file-download-btn"
              onClick={handleDownload}
            >
              Download
            </button>
          )}
        </div>
      }
      actions={
        <div className="tool-actions">
          <button
            className={`btn ${
              mode === "encode" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => toggleMode("encode")}
          >
            Encode
          </button>

          <button
            className={`btn ${
              mode === "decode" ? "btn-primary" : "btn-secondary"
            }`}
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
