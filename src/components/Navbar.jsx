import "@styles/components/navbar.css";
import "@styles/components/searchbar.css";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";

export default function Navbar({ searchTerm, setSearchTerm }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Transform<span className="logo-highlight">JS</span>
      </Link>

      <div className="nav-right">
        <input
          type="text"
          placeholder="(Ctrl+K) Search.. "
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
