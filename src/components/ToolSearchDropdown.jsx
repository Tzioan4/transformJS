import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { tools } from "../tools";

export default function ToolSearchDropdown({ searchTerm, setSearchTerm }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const location = useLocation();

  const filteredTools = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) return [];

    return tools
      .filter((tool) => {
        return (
          tool.name.toLowerCase().includes(value) ||
          tool.description.toLowerCase().includes(value) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(value))
        );
      })
      .slice(0, 8);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

function handleChange(e) {
  setSearchTerm(e.target.value);
  setOpen(true);
}

  function handleSelect() {
    setOpen(false);
    setSearchTerm("");
  }

  return (
    <div className="nav-search-wrapper" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search tools..."
        aria-label="Search tools. Ctrl K"
        className="search-input"
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => {
          if (searchTerm.trim()) {
            setOpen(true);
          }
        }}
      />

      {open && searchTerm.trim() && (
        <div className="nav-search-dropdown">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => {
              const isActive = location.pathname === tool.path;

              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`nav-search-item ${isActive ? "active" : ""}`}
                  onClick={handleSelect}
                >
                  <span>{tool.name}</span>
                  <small>{tool.description}</small>
                </Link>
              );
            })
          ) : (
            <p className="nav-search-empty">No tools found.</p>
          )}
        </div>
      )}
    </div>
  );
}
