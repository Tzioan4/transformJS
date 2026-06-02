import "@styles/tools/tools.css";

const CATEGORY_LABELS = {
  code: "Code",
  data: "Data",
  security: "Security",
  text: "Text",
};

export default function ToolLayout({
  header,
  category,
  input,
  output,
  actions,
  children,
  className = "",
}) {
  const categoryLabel = CATEGORY_LABELS[category];

  return (
    <div className={`tool-container ${className}`}>
      <div className="tool-header">
        {categoryLabel && (
          <span className="tool-category-badge">{categoryLabel}</span>
        )}

        {header}
      </div>

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
