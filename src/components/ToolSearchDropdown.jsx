import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { tools } from "../tools";

export default function ToolSearchDropdown({ searchTerm, setSearchTerm }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  const filteredTools = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) return [];

    return tools
      .filter((tool) => tool.name.toLowerCase().includes(value))
      .slice(0, 8);
  }, [searchTerm]);

  useEffect(() => {
    setActiveIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleChange(e) {
    setSearchTerm(e.target.value);
    setOpen(true);
  }

  function handleSelect() {
    setOpen(false);
    setSearchTerm("");
    setActiveIndex(0);
  }

  function handleKeyDown(e) {
    if (!open || filteredTools.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveIndex((current) =>
        current === filteredTools.length - 1 ? 0 : current + 1,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveIndex((current) =>
        current === 0 ? filteredTools.length - 1 : current - 1,
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const selectedTool = filteredTools[activeIndex];

      if (!selectedTool) return;

      handleSelect();
      navigate(selectedTool.path);
    }
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
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (searchTerm.trim()) {
            setOpen(true);
          }
        }}
      />

      {open && searchTerm.trim() && (
        <div className="nav-search-dropdown">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => {
              const isCurrentRoute = location.pathname === tool.path;
              const isKeyboardActive = activeIndex === index;

              return (
                <Link
                  key={tool.path}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  to={tool.path}
                  className={`nav-search-item ${
                    isCurrentRoute ? "active" : ""
                  } ${isKeyboardActive ? "keyboard-active" : ""}`}
                  onClick={handleSelect}
                  onMouseEnter={() => setActiveIndex(index)}
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
