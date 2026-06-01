import { useLocation } from "react-router-dom";
import "../styles/components/page-transition.css";

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
}
