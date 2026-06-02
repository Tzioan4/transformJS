import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { encodeBase64, decodeBase64 } from "../../utils/base64";
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

export default function Base64Tool({ tips, category }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { copied, copy } = useCopy();

  const isBase64 = (str) => {
    if (!str || str.trim() === "" || str.length < 4) return false;

    try {
      const base64Regex =
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

      if (!base64Regex.test(str)) return false;

      return btoa(atob(str)) === str;
    } catch {
      return false;
    }
  };

  const handleProcess = () => {
    setError(null);
    setInfo(null);

    if (!input || input.trim() === "") {
      setInfo("Please enter text to encode/decode");
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        if (isBase64(input)) {
          setError(
            "Action Blocked: This text is already Base64 encoded. Switch to Decode mode instead.",
          );
          setOutput("");
          return;
        }

        setOutput(encodeBase64(input));
      } else {
        setOutput(decodeBase64(input));
      }
    } catch {
      setError("Invalid input for " + mode);
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setInfo(null);
    setIsDragging(false);
  };

  const toggleMode = (newMode) => {
    if (newMode === mode) return;

    const nextInput = output || input;

    setMode(newMode);
    setInput(nextInput);
    setError(null);
    setInfo(null);

    try {
      if (nextInput) {
        if (newMode === "encode" && isBase64(nextInput)) {
          setOutput("");
          setError(
            "Ready to encode, but this looks like Base64. Verify your input.",
          );
          return;
        }

        const result =
          newMode === "encode"
            ? encodeBase64(nextInput)
            : decodeBase64(nextInput);

        setOutput(result);
      }
    } catch {
      setOutput("");
    }
  };

  const handleFileLoad = async (file) => {
    if (!file) return;

    try {
      const text = await readTextFile(file, {
        allowedExtensions: ALLOWED_FILE_TYPES,
        maxSize: 2 * 1024 * 1024,
      });

      setInput(text);
      setOutput("");
      setError(null);
      setInfo(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = mode === "encode" ? "encoded.txt" : "decoded.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>Base64 Tool</h1>
          <p>
            Bi-directional Base64 conversion for text and binary data strings
          </p>

          <div className={`mode-indicator ${mode}`}>
            Current Mode:{" "}
            <strong>
              {mode === "encode"
                ? "Encode (Paste your text)"
                : "Decode (Paste your Base64 string)"}
            </strong>
          </div>

          {mode === "encode" && isBase64(input) && (
            <div className="input-warning-text">
              Warning: Input is already Base64 encoded. Switch to{" "}
              <strong>Decode </strong>
              mode.
            </div>
          )}

          {info && (
            <div className="info-badge">
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
                : "Paste Base64, upload a file, or drag and drop it."
            }
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
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
            value={output}
            readOnly
          />

          {output && (
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
            onClick={() => copy(output)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!output}
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
