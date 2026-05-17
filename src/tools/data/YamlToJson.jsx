import { useState, useEffect } from "react";
import yaml from "js-yaml";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import "../../styles/tools/yaml.css";

export default function YamlToJson({ tips }) {
  const [yamlInput, setYamlInput] = useState(
    "server:\n  port: 8080\n  host: localhost\n  enabled: true\ntags:\n  - docker\n  - react",
  );
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState(null);

  const { copied, copy } = useCopy();

  useEffect(() => {
    if (!yamlInput.trim()) {
      setJsonOutput("");
      setError(null);
      return;
    }
    try {
      const obj = yaml.load(yamlInput);
      const json = JSON.stringify(obj, null, 2);
      setJsonOutput(json);
      setError(null);
    } catch (e) {
      setError("Invalid YAML: " + e.message);
    }
  }, [yamlInput]);

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>YAML to JSON</h1>
        <p>Convert your YAML configuration to a clean JSON object.</p>
        {tips && <ToolInfo tips={tips} />}
      </div>

      {error && (
        <div className="error-badge" style={{ marginBottom: "15px" }}>
          {error}
        </div>
      )}

      <div className="tool-workspace">
        <textarea
          className="tool-textarea"
          value={yamlInput}
          onChange={(e) => setYamlInput(e.target.value)}
          placeholder="Paste your YAML here..."
          style={error ? { borderColor: "#ef4444" } : {}}
        />

        <textarea
          className="tool-textarea yaml-output"
          value={jsonOutput}
          readOnly
          placeholder="JSON output will appear here..."
        />
      </div>

      <div className="tool-actions">
        <button
          disabled={!!error || !jsonOutput}
          onClick={() => copy(jsonOutput)}
          className={`btn ${copied ? "btn-success" : "btn-secondary"}`}
        >
          {copied ? "Copied" : "Copy JSON"}
        </button>

        <button className="btn btn-danger" onClick={() => setYamlInput("")}>
          Clear
        </button>
      </div>
    </div>
  );
}
