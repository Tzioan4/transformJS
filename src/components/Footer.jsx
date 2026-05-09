import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* left side: brand and copyright */}
        <div className="footer-left">
          <span className="footer-brand">transformJS</span>
          <span className="footer-copy">© 2026 — built for devs</span>
        </div>

        {/* right side: simple links */}
        <div className="footer-links">
          <a href="https://github.com/Tzioan4" target="_blank" rel="noreferrer">
            github
          </a>
          <Link to="/privacy">privacy</Link>
          <Link to="/terms">terms</Link>
        </div>
      </div>
    </footer>
  );
}
