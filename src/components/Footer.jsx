import "@styles/components/footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-brand">
            Transform<span>JS</span>
          </span>
          <span className="footer-copy">
            Copyright © {new Date().getFullYear()}{" "}
            <a
              href="https://www.linkedin.com/in/giannistziotis/"
              target="_blank"
              rel="noopener noreferrer"
              className="author-link"
            >
              Tziotis Ioannis
            </a>
          </span>
        </div>

        <div className="footer-links">
          <span className="footer-license">Released under the MIT License.</span>
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
