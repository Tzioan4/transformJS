import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import About from "./pages/About";

// tools registry
import { tools } from "./tools";

// scroll reset helper
function ScrollToTop({ setSearchTerm }) {
  const location = useLocation();

  useEffect(() => {
    setSearchTerm("");
    window.scrollTo(0, 0);
  }, [location, setSearchTerm]);

  return null;
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <ScrollToTop setSearchTerm={setSearchTerm} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main style={{ flex: 1 }}>
          <Routes>
            {/* home */}
            <Route path="/" element={<Home searchTerm={searchTerm} />} />

            {/* auto-generated tool routes */}
            {tools.map((tool) => (
              <Route
                key={tool.path}
                path={tool.path}
                element={<tool.component />}
              />
            ))}

            {/* legal pages */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />

            {/* fallback */}
            <Route path="*" element={<Home searchTerm={searchTerm} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
