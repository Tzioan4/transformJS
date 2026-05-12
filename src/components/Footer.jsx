import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-brand">transformJS </span>
          <span className="footer-copy">
            © {new Date().getFullYear()} — Built by{" "}
            <a
              href="https://github.com/Tzioan4"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Ioannis Tz.
            </a>
          </span>
        </div>

        <div className="footer-links">
          <span
            className="footer-license"
            style={{ opacity: 0.6, fontSize: "0.85rem", marginRight: "10px" }}
          >
            MIT License
          </span>
          <a
            href="https://github.com/Tzioan4/transformJS"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <Link to="/privacy">Privacy</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </footer>
  );
}
