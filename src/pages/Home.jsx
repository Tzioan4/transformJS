import { useState } from "react";
import "../styles/pages/home.css";
import Hero from "../components/Hero";
import { tools } from "../tools";
import { Link } from "react-router-dom";
import { ShieldCheck, Zap, Cpu } from "lucide-react";

function StarIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#F7DF1E"
      style={{ verticalAlign: "middle", marginBottom: "2px" }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      height="16"
      width="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ fill: "currentColor" }}
    >
      <path d="M8 0c4.42 0 8 3.58 8 8 0 3.54-2.29 6.53-5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const PROMISES = [
  {
    key: "secure",
    icon: <ShieldCheck size={24} color="gray" />,
    title: "100% Local & Secure",
    desc: "Your data never leaves your computer. All transformations happen locally in your browser's V8 engine.",
  },
  {
    key: "fast",
    icon: <Zap size={24} />,
    title: "Zero Dependencies",
    desc: "No external bloatware or heavy libraries. Built with pure JavaScript for blazing fast performance (~10ms execution).",
  },
  {
    key: "dev",
    icon: <Cpu size={24} />,
    title: "Developer Focused UX",
    desc: "Monospaced outputs, persistent configurations, and one-click copy feedback. Designed for developers, by developers.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "code", label: "Code" },
  { id: "data", label: "Data" },
  { id: "security", label: "Security" },
  { id: "text", label: "Text" },
];

export default function Home({ searchTerm }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || tool.tags.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const isSearching = searchTerm.length > 0;

  return (
    <div>
      {!isSearching && (
        <>
          <Hero />

          <section className="promises-section">
            <div className="promises-grid">
              {PROMISES.map(({ key, icon, title, desc }) => (
                <div key={key} className={`promise-card ${key}`}>
                  <div className="promise-icon-wrapper">{icon}</div>
                  <div className="promise-content">
                    <h3 className="promise-title">{title}</h3>
                    <p className="promise-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <div id="tools-section" className="tools-section-wrapper">
        {/* Category filter bar */}
        {!isSearching && (
          <div className="category-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        <div className="tools-grid">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link to={tool.path} key={tool.path} className="tool-card">
                <div className="tool-icon">{tool.icon}</div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
              </Link>
            ))
          ) : (
            <p style={{ color: "#555", fontFamily: "var(--font-mono)" }}>
              No tools found
              {searchTerm ? ` for "${searchTerm}"` : " in this category"}.
            </p>
          )}
        </div>
      </div>

      {!isSearching && (
        <section className="contrib-section">
          <div className="contrib-banner">
            <div className="contrib-text">
              <h3 className="contrib-title">
                If TransformJS saved you time, <StarIcon /> on GitHub means a
                lot.
              </h3>
              <p className="contrib-desc">
                TransformJS is open-source and free forever. A star helps others
                discover it.
              </p>
            </div>

            <a
              href="https://github.com/Tzioan4/transformJS"
              target="_blank"
              rel="noreferrer"
              className="contrib-btn"
            >
              <GitHubIcon />
              Star on GitHub
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
