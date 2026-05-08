import { Link } from "react-router-dom";
import { tools } from "../data/tools";

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
    <div style={gridStyle}>
      {/* loop through the filtered list to show cards */}
      {filteredTools.map((tool) => (
        <Link
          key={tool.name}
          to={tool.path}
          style={cardStyle}
          // make the card move up a bit when hovering
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)";
          }}
          // reset position when mouse leaves
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {/* icon container */}
          <div style={{ marginBottom: "15px", opacity: 0.9 }}>{tool.icon}</div>

          {/* tool title */}
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              margin: 0,
              textAlign: "center",
            }}
          >
            {tool.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}
