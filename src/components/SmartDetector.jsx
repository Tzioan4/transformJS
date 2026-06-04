import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { detectTool } from "../utils/detectTool";
import { tools } from "../tools";
import { readTextFile } from "../utils/file";
import DropOverlay from "./DropOverlay";
import "../styles/components/smart-detector.css";

const ALLOWED_FILE_EXTENSIONS = [
  ".txt",
  ".json",
  ".md",
  ".markdown",
  ".html",
  ".htm",
  ".sql",
  ".yaml",
  ".yml",
  ".csv",
];

function isAllowedTextFile(file) {
  const fileName = file.name.toLowerCase();

  return ALLOWED_FILE_EXTENSIONS.some((extension) =>
    fileName.endsWith(extension),
  );
}

export default function SmartDetector() {
  const [input, setInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");


  const detection = useMemo(() => detectTool(input), [input]);

  const detectedTool = useMemo(() => {
    if (!detection) return null;

    return tools.find((tool) => tool.path === detection.tool);
  }, [detection]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "Escape") return;

      if (!input && !fileError) return;

      setInput("");
      setFileError("");
      setIsDragging(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, fileError]);

  async function handleFile(file) {
    setFileError("");

    if (!isAllowedTextFile(file)) {
      setInput("");
      setFileError("Only text-based developer files are supported.");
      return;
    }

    try {
      const text = await readTextFile(file);
      setInput(text);
    } catch (err) {
      setFileError(err.message || "Could not read file.");
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    handleFile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  }



  return (
    <section className="smart-detector">
      <div className="smart-detector-content">
        <div className="smart-detector-header">
          <h2>Paste something. Find the right tool.</h2>

          <p>
            TransformJS can detect common developer formats and suggest the
            right local browser tool.
          </p>
        </div>

        <div
          className={`smart-detector-drop ${isDragging ? "dragging" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <textarea
            id="smart-detector-input"
            name="smart-detector-input"
            className="smart-detector-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setFileError("");
            }}
            placeholder="Paste or drop JSON, JWT, CSV, YAML, HTML, Markdown, SQL, URL, UUID, color, or Base64..."
            rows={4}
          />

          {isDragging && <DropOverlay label="Drop text file here" />}
        </div>

        {fileError && <p className="smart-detector-error">{fileError}</p>}

        {detection && detectedTool && (
          <div className="smart-detector-result">
            <div>
              <span className="smart-detector-label">
                {detection.confidence >= 80
                  ? `Detected ${detection.label}`
                  : `Possible match: ${detection.label}`}
              </span>

              <p>{detectedTool.description}</p>
            </div>

            <Link className="btn btn-primary" to={detectedTool.path}>
              Open {detectedTool.name}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
