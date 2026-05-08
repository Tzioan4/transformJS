import { Link } from "react-router-dom";

export default function ToolCard({ tool }) {
  return (
    <Link
      to={tool.path}
      // changed from tailwind classes to our css classes
      className="tool-card"
    >
      {/* showing the tool icon we added in data file */}
      <div className="tool-icon">{tool.icon}</div>

      {/* tool name heading */}
      <h2 className="tool-title">{tool.name}</h2>

      {/* description of what the tool does */}
      <p className="tool-desc">{tool.description}</p>
    </Link>
  );
}
