import "../styles/components/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        transformJS
      </Link>

      <div className="nav-right">
        <input
          type="text"
          placeholder="Search tools..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </nav>
  );
}
