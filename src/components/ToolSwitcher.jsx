import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { tools } from "../tools";
import "@styles/components/tool-switcher.css";

const CATEGORY_LABELS = {
  code: "Code",
  data: "Data",
  security: "Security",
  text: "Text",
};

const OPEN_TOOL_SWITCHER_EVENT = "open-tool-switcher";

export default function ToolSwitcher() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef(null);
  const itemRefs = useRef([]);

  const location = useLocation();
  

  const filteredTools = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return tools;

    return tools.filter((tool) => tool.name.toLowerCase().includes(value));
  }, [search]);

  const groupedTools = useMemo(() => {
    return filteredTools.reduce((groups, tool) => {
      const category = tool.tags.find((tag) => CATEGORY_LABELS[tag]) || "other";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(tool);

      return groups;
    }, {});
  }, [filteredTools]);

  const visibleTools = useMemo(() => {
    return Object.keys(CATEGORY_LABELS).flatMap(
      (category) => groupedTools[category] || [],
    );
  }, [groupedTools]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearch("");
    setActiveIndex(0);
  }, []);

  const handleOpen = useCallback(() => {
    const currentToolIndex = visibleTools.findIndex(
      (tool) => tool.path === location.pathname,
    );

    setActiveIndex(currentToolIndex >= 0 ? currentToolIndex : 0);
    setOpen(true);
  }, [location.pathname, visibleTools]);

  const handleToggle = useCallback(() => {
    if (open) {
      handleClose();
      return;
    }

    handleOpen();
  }, [handleClose, handleOpen, open]);

  useEffect(() => {
    function handleShortcut() {
      handleToggle();
    }

    window.addEventListener(OPEN_TOOL_SWITCHER_EVENT, handleShortcut);

    return () => {
      window.removeEventListener(OPEN_TOOL_SWITCHER_EVENT, handleShortcut);
    };
  }, [handleToggle]);

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    itemRefs.current[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex, open]);

  useEffect(() => {
    if (!open) return;

    function handleEscape(e) {
      if (e.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, open]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setActiveIndex(0);
  }

  function handleKeyDown(e) {
    if (visibleTools.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveIndex((current) =>
        current === visibleTools.length - 1 ? 0 : current + 1,
      );

      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveIndex((current) =>
        current === 0 ? visibleTools.length - 1 : current - 1,
      );

      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      itemRefs.current[activeIndex]?.click();
    }
  }

  return (
    <div className="tool-switcher">
      <button
        type="button"
        className={`tool-switcher-floating-toggle ${open ? "open" : ""}`}
        onClick={handleToggle}
        aria-label={open ? "Close tool switcher" : "Open tool switcher"}
        aria-expanded={open}
        aria-controls="tool-switcher-sidebar"
        title="Switch Tool (Ctrl+Shift+K)"
      >
        {open ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}

        <span className="tool-switcher-toggle-tooltip">
          Switch Tool
          <kbd>Ctrl+Shift+K</kbd>
        </span>
      </button>

      {open && (
        <>
          <div className="tool-switcher-backdrop" onMouseDown={handleClose} />

          <aside
            id="tool-switcher-sidebar"
            className="tool-switcher-sidebar"
            aria-label="Tool switcher"
          >
            <div className="tool-switcher-header">
              <div>
                <h2>Switch Tool</h2>
                <span className="tool-switcher-shortcut">Ctrl+Shift+K</span>
              </div>

              <button
                type="button"
                className="tool-switcher-close"
                onClick={handleClose}
                aria-label="Close tool switcher"
              >
                <X size={18} />
              </button>
            </div>

            <div className="tool-switcher-search-wrapper">
              <input
                ref={inputRef}
                className="tool-switcher-search"
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="tool-switcher-list">
              {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
                const categoryTools = groupedTools[category];

                if (!categoryTools?.length) return null;

                return (
                  <div key={category} className="tool-switcher-group">
                    <h3>{label}</h3>

                    {categoryTools.map((tool) => {
                      const toolIndex = visibleTools.findIndex(
                        (item) => item.path === tool.path,
                      );

                      const isCurrentRoute = location.pathname === tool.path;

                      const isKeyboardActive = activeIndex === toolIndex;

                      return (
                        <Link
                          key={tool.path}
                          ref={(element) => {
                            itemRefs.current[toolIndex] = element;
                          }}
                          to={tool.path}
                          className={`tool-switcher-item ${
                            isCurrentRoute ? "active" : ""
                          } ${isKeyboardActive ? "keyboard-active" : ""}`}
                          onClick={handleClose}
                          onMouseEnter={() => setActiveIndex(toolIndex)}
                        >
                          <span>{tool.name}</span>
                          <small>{tool.description}</small>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}

              {visibleTools.length === 0 && (
                <p className="tool-switcher-empty">No tools found.</p>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
