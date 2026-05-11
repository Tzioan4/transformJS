import "../styles/pages/home.css";
import Hero from "../components/Hero";
import { tools } from "../tools";
import { Link } from "react-router-dom";

export default function Home({ searchTerm }) {
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      {!searchTerm && <Hero />}

      <div
        id="tools-section"
        className="container"
        style={{ padding: "40px 20px" }}
      >
        <div className="tools-grid">
          {filteredTools.map((tool) => (
            <Link to={tool.path} key={tool.path} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
