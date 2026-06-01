import { useState } from "react";
import Papa from "papaparse";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import { readTextFile } from "../../utils/file";
import DropOverlay from "../../components/DropOverlay";

function inferType(raw) {
  if (raw === undefined || raw === null) return null;

  if (typeof raw !== "string") return raw;

  const trimmed = raw.trim();

  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }

  if (trimmed !== "" && !isNaN(trimmed) && !isNaN(parseFloat(trimmed))) {
    return parseFloat(trimmed);
  }

  if (trimmed.toLowerCase() === "true") return true;
  if (trimmed.toLowerCase() === "false") return false;

  return trimmed;
}

export default function CsvToJson({ tips }) {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { copied, copy } = useCopy();

  const handleConvert = () => {
    setError(null);
    setJson("");

    if (!csv.trim()) return;

    const results = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      quotes: true,
      quoteChar: '"',
      escapeChar: '"',
      transformHeader: (h) => h.trim(),
    });

    if (results.errors?.length) {
      console.warn("CSV parsing errors:", results.errors);
      setError(
        `Parsing completed with ${results.errors.length} issue(s). Check console for details.`,
      );
    }

    if (!results.data || results.data.length === 0) {
      setError("No valid data found in CSV.");
      return;
    }

    const expectedKeys = results.meta?.fields ?? [];

    const cleaned = results.data
      .filter((row) => Object.keys(row).length > 0)
      .map((row) => {
        const newRow = {};

        expectedKeys.forEach((key) => {
          newRow[key] = inferType(row[key]);
        });

        return newRow;
      });

    setJson(JSON.stringify(cleaned, null, 2));
  };

  const handleClear = () => {
    setCsv("");
    setJson("");
    setError(null);
    setIsDragging(false);
  };

  const handleFileLoad = async (file) => {
    if (!file) return;

    try {
      const text = await readTextFile(file, {
        allowedExtensions: [".csv"],
        maxSize: 2 * 1024 * 1024,
      });

      setCsv(text);
      setJson("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => {
    if (!json) return;

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      header={
        <div>
          <h1>CSV to JSON</h1>
          <p>
            Convert complex CSV data to clean JSON with full RFC 4180
            compliance.
          </p>

          {json && !error && (
            <div
              className="status-badge status-pretty"
              style={{ marginTop: 12 }}
            >
              STATUS: <strong>CONVERTED</strong>
            </div>
          )}

          {error && (
            <div className="error-badge" style={{ marginTop: 12 }}>
              {error}
            </div>
          )}

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
          {isDragging && <DropOverlay label="Drop .csv file here" />}

          <textarea
            className="tool-textarea"
            placeholder="Paste CSV here, upload a .csv file, or drag and drop it."
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
          />

          <label className="file-load-btn">
            Load .csv file
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => handleFileLoad(e.target.files[0])}
            />
          </label>
        </div>
      }
      output={
        <div className="file-drop-wrap">
          <textarea
            className="tool-textarea"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
            }}
            placeholder="JSON output..."
            value={json}
            readOnly
          />

          {json && (
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
          <button onClick={handleConvert} className="btn btn-primary">
            Parse CSV
          </button>

          <button
            onClick={() => copy(json)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!json}
          >
            {copied ? "Copied!" : "Copy JSON"}
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
