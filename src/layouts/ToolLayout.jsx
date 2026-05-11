export default function ToolLayout({ header, input, output, actions }) {
  return (
    <div className="tool-container">
      {/*header */}
      <div className="tool-header">{header}</div>

      {/*workspace */}
      <div className="tool-workspace">
        <div className="tool-input">{input}</div>
        <div className="tool-output">{output}</div>
      </div>

      {/*actions */}
      <div className="tool-actions">{actions}</div>
    </div>
  );
}
