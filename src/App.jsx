import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./ThemeContext";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import About from "./pages/About";

import { tools } from "./tools";

function ScrollToTop({ setSearchTerm }) {
  const location = useLocation();

  useEffect(() => {
    setSearchTerm("");
    window.scrollTo(0, 0);
  }, [location, setSearchTerm]);

  return null;
}

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <ScrollToTop setSearchTerm={setSearchTerm} />

      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />

            {tools.map((tool) => (
              <Route
                key={tool.path}
                path={tool.path}
                element={<tool.component />}
              />
            ))}

            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home searchTerm={searchTerm} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}
