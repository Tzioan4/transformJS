import { Link } from "react-router-dom";
import "../styles/pages/not-found.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="animate-fade-up-fast">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found-btn">
          Back to Tools
        </Link>
      </div>
    </div>
  );
}
