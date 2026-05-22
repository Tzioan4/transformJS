import { Link } from "react-router-dom";

export default function ToolErrorFallback({ error }) {
  return (
    <div className="not-found">
      <div className="animate-fade-up-fast">
        <div className="not-found-code">Error</div>

        <h1 className="not-found-title">Something went wrong</h1>

        <p className="not-found-desc">
          This page crashed while rendering. Go back home and try again.
        </p>

        {error?.message && (
          <p className="not-found-desc">
            <code>{error.message}</code>
          </p>
        )}

        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link to="/" className="not-found-btn">
            Back to Home
          </Link>

          <a
            href="https://github.com/Tzioan4/transformJS/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="not-found-btn"
          >
            Report Issue
          </a>
        </div>
      </div>
    </div>
  );
}
