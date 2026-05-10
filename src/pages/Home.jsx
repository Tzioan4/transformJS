import { Link } from "react-router-dom";
import { tools } from "../tools";

export default function Home({ searchTerm }) {
  // filter the tools based on what the user types in search
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // setup for the grid layout
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "120px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  };

  // style for each individual tool box
  const cardStyle = {
    aspectRatio: "1 / 1",
    borderRadius: "35px",
    backgroundColor: "rgb(255, 255, 255)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "white",
    color: "#000000",
    transition: "all 0.3s ease",
  };

  return (
    <div className="tools-grid">
      {filteredTools.map((tool) => (
        <Link key={tool.name} to={tool.path} className="tool-card">
          <div className="tool-icon">{tool.icon}</div>
          <h2>{tool.name}</h2>
          <p>{tool.description}</p>
        </Link>
      ))}
    </div>
  );
}
