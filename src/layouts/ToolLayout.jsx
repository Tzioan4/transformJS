import "@styles/tools/tools.css";

export default function ToolLayout({
  header,
  input,
  output,
  actions,
  children,
}) {
  return (
    <div className="tool-container">
      <div className="tool-header">{header}</div>

      {children ? (
        <div className="tool-workspace">{children}</div>
      ) : (
        <div className="tool-workspace">
          <div className="tool-input">{input}</div>
          <div className="tool-output">{output}</div>
        </div>
      )}

      {actions && <div className="tool-actions">{actions}</div>}
    </div>
  );
}
