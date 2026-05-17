import { useState, useEffect, useRef } from "react";
import "../styles/components/toolinfo.css";

export default function ToolInfo({ tips }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  //closes when clicked outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="tool-info" ref={ref}>
      <button
        className={`tool-info-btn ${open ? "active" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Show tips"
      >
        TIPS
      </button>

      {open && (
        <div className="tool-info-panel">
          <ul className="tool-info-list">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
