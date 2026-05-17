import { useState, useEffect } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { encodeBase64, decodeBase64 } from "../../utils/base64";



const EXAMPLE_TEXT = "Hello World! Welcome to transformJS.";

export default function Base64Tool({ tips }) {
  const [input, setInput] = useState(EXAMPLE_TEXT);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState(null);

  const { copied, copy } = useCopy();

  useEffect(() => {
    handleProcess();
  }, []);

  const isBase64 = (str) => {
    if (!str || str.trim() === "" || str.length < 4) return false;
    try {
      const base64Regex =
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
      if (!base64Regex.test(str)) return false;
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const handleProcess = () => {
    setError(null);
    if (!input) return;

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
    } catch (err) {
      setError("Invalid input for " + mode);
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const toggleMode = (newMode) => {
    if (newMode === mode) return;

    const nextInput = output || input;
    const nextMode = newMode;

    setMode(nextMode);
    setInput(nextInput);
    setError(null);

    try {
      if (nextInput) {
        if (nextMode === "encode" && isBase64(nextInput)) {
          setOutput("");
          setError(
            "Ready to encode, but this looks like Base64. Verify your input.",
          );
          return;
        }

        const result =
          nextMode === "encode"
            ? encodeBase64(nextInput)
            : decodeBase64(nextInput);
        setOutput(result);
      }
    } catch (err) {
      setOutput("");
    }
  };

  return (
    <ToolLayout
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

          {/*input validation*/}
          {mode === "encode" && isBase64(input) && (
            <div className="input-warning-text">
              Warning: Input is already Base64 encoded. Switch to{" "}
              <strong>Decode </strong>
              mode.
            </div>
          )}

          {error && <div className="error-badge">{error}</div>}

          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder={mode === "encode" ? "Enter text..." : "Enter Base64..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      }
      output={
        <textarea
          className="tool-textarea"
          placeholder="Result will appear here..."
          value={output}
          readOnly
        />
      }
      actions={
        <div className="tool-actions">
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
            onClick={() => copy(output)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!output}
          >
            {copied ? "Copied" : "Copy"}
          </button>

          <button onClick={handleClear} className="btn btn-danger">
            Clear
          </button>
        </div>
      }
    />
  );
}
