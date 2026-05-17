import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/pages/not-found.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found-btn">
        Back to Tools
        </Link>
      </motion.div>
    </div>
  );
}
