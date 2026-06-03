import { useState, useCallback } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "@/components/ToolInfo";
import useCopy from "../../hooks/useCopy";
import "../../styles/tools/ftl.css";
import { processFTL } from "./ftl.evaluator";


//component

function TabBar({ tabs, active, onChange }) {
  return (
    <div className="ftl-tab-bar">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`ftl-tab-btn ${active === key ? "active" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function FtlPreviewer({ tips, category }) {
  const [template, setTemplate] = useState("");
  const [mockData, setMockData] = useState("");
  const [rendered, setRendered] = useState("");
  const [error, setError] = useState(null);

  //output tabs: preview/html
  const [outputTab, setOutputTab] = useState("preview");

  //mobile input tabs: template/data
  const [inputTab, setInputTab] = useState("template");

  const { copied, copy } = useCopy();

  const handleRender = useCallback(() => {
    setError(null);
    try {
      const data = JSON.parse(mockData);
      const result = processFTL(template, data);
      setRendered(result);
      //switch to output on mobile after render
      setOutputTab("preview");
    } catch (e) {
      setError(e.message);
      setRendered("");
    }
  }, [template, mockData]);

  const handleClear = () => {
    setTemplate("");
    setMockData("{}");
    setRendered("");
    setError(null);
  };

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>FTL Previewer</h1>
          <p>
            Preview FreeMarker templates with mock JSON data locally, no server
            needed.
          </p>
          {rendered && !error && (
            <div className="status-badge status-badge-spaced status-pretty">
              STATUS: <strong>RENDERED</strong>
            </div>
          )}
          {error && (
            <div className="error-badge status-badge-spaced">{error}</div>
          )}
          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <div className="tool-textarea ftl-panel">
          {/*mobile tabs for input template / data */}
          <TabBar
            tabs={[
              { key: "template", label: "FTL Template" },
              { key: "data", label: "Mock Data (JSON)" },
            ]}
            active={inputTab}
            onChange={setInputTab}
          />

          <div className="ftl-panel-body">
            {inputTab === "template" && (
              <>
                <textarea
                  className="tool-textarea ftl-editor"
                  style={{
                    flex: 1,
                    minHeight: "350px",
                    fontSize: "12px",
                    resize: "vertical",
                    border: "none",
                  }}
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  placeholder="Paste your FTL template here..."
                  spellCheck={false}
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </>
            )}

            {inputTab === "data" && (
              <>
                <textarea
                  className="tool-textarea"
                  style={{
                    flex: 1,
                    minHeight: "350px",
                    fontSize: "12px",
                    resize: "vertical",
                    border: "none",
                  }}
                  value={mockData}
                  onChange={(e) => setMockData(e.target.value)}
                  placeholder='{ "variable": "value" }'
                  spellCheck={false}
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </>
            )}
          </div>
        </div>
      }
      output={
        <div
          className="tool-textarea"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
            overflow: "hidden",
          }}
        >
          {/*output tabs preview / html source */}
          <TabBar
            tabs={[
              { key: "preview", label: "Preview" },
              { key: "html", label: "HTML Source" },
            ]}
            active={outputTab}
            onChange={setOutputTab}
          />

          <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
            {!rendered && !error && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#333",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                Press "Render" to preview your template
              </div>
            )}

            {rendered && outputTab === "preview" && (
              <iframe
                srcDoc={rendered}
                sandbox="allow-scripts"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "350px",
                  border: "none",
                  background: "#ffffff",
                }}
                title="FTL Preview"
              />
            )}

            {rendered && outputTab === "html" && (
              <pre
                style={{
                  margin: 0,
                  padding: "16px",
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  overflowY: "auto",
                }}
              >
                {rendered}
              </pre>
            )}
          </div>
        </div>
      }
      actions={
        <>
          <button onClick={handleRender} className="btn btn-primary">
            Render
          </button>
          <button
            onClick={() => copy(rendered)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!rendered}
          >
            {copied ? "Copied" : "Copy HTML"}
            <span className="btn-hint">Ctrl+Shift+C</span>
          </button>
          <button onClick={handleClear} className="btn btn-danger">
            Clear <span className="btn-hint">Esc</span>
          </button>
        </>
      }
    />
  );
}
