import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { tools } from "../tools";
import "@styles/components/tool-switcher.css";

const CATEGORY_LABELS = {
  code: "Code",
  data: "Data",
  security: "Security",
  text: "Text",
};

export default function ToolSwitcher() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const filteredTools = useMemo(() => {
    const value = search.trim().toLowerCase();

    return tools.filter((tool) => {
      if (!value) return true;

      return (
        tool.name.toLowerCase().includes(value) ||
        tool.description.toLowerCase().includes(value) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(value))
      );
    });
  }, [search]);

  const groupedTools = filteredTools.reduce((groups, tool) => {
    const category = tool.tags.find((tag) => CATEGORY_LABELS[tag]) || "other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(tool);
    return groups;
  }, {});

  return (
    <div className="tool-switcher">
      <button
        type="button"
        className="btn btn-secondary tool-switcher-btn"
        onClick={() => setOpen(true)}
      >
        Switch Tool
      </button>

      {open && (
        <div
          className="tool-switcher-overlay"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="tool-switcher-panel"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="tool-switcher-header">
              <h2>Switch Tool</h2>

              <button
                type="button"
                className="tool-switcher-close"
                onClick={() => setOpen(false)}
                aria-label="Close tool switcher"
              >
                ×
              </button>
            </div>

            <input
              ref={inputRef}
              className="tool-switcher-search"
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="tool-switcher-list">
              {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
                const categoryTools = groupedTools[category];

                if (!categoryTools?.length) return null;

                return (
                  <div key={category} className="tool-switcher-group">
                    <h3>{label}</h3>

                    {categoryTools.map((tool) => {
                      const isActive = location.pathname === tool.path;

                      return (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          className={`tool-switcher-item ${
                            isActive ? "active" : ""
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          <span>{tool.name}</span>
                          <small>{tool.description}</small>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}

              {filteredTools.length === 0 && (
                <p className="tool-switcher-empty">No tools found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
