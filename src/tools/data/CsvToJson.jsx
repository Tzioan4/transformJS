import { useState } from "react";
import Papa from "papaparse";
import ToolLayout from "../../layouts/ToolLayout";
import useCopy from "../../hooks/useCopy";

export default function CsvToJson() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [error, setError] = useState(null);
  const { copied, copy } = useCopy();

  const handleConvert = () => {
    setError(null);
    setJson("");

    if (!csv.trim()) return;

    const results = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
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

    //extract the expected headers from the first parse result
    const expectedKeys = results.meta?.fields ?? [];

    const cleaned = results.data
      .filter((row) => Object.keys(row).length > 0)
      .map((row) => {
        //remove __parsed_extra and restrict to known headers
        const newRow = {};
        expectedKeys.forEach((key) => {
          const value = row[key];

          //normalize missing fields to null
          if (value === undefined) {
            newRow[key] = null;
            return;
          }

          if (typeof value !== "string") {
            newRow[key] = value;
            return;
          }

          //trim string values
          const trimmed = value.trim();

          //attempt JSON parse only for obvious JSON shapes
          if (
            (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
            (trimmed.startsWith("[") && trimmed.endsWith("]"))
          ) {
            try {
              newRow[key] = JSON.parse(trimmed);
            } catch {
              newRow[key] = trimmed;
            }
          } else {
            newRow[key] = trimmed === "" ? null : trimmed;
          }
        });

        return newRow;
      });

    setJson(JSON.stringify(cleaned, null, 2));
  };

  const handleClear = () => {
    setCsv("");
    setJson("");
    setError(null);
  };

  return (
    <ToolLayout
      header={
        <div>
          <h1>CSV to JSON</h1>
          <p>Robust CSV parser</p>

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
        </div>
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder="Paste CSV here..."
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
        />
      }
      output={
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
          </button>

          <button onClick={handleClear} className="btn btn-danger">
            Clear
          </button>
        </div>
      }
    />
  );
}
