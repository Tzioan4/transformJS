import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// tool pages imports
import JsonFormatter from "./pages/tools/JsonFormatter";
import Base64Tool from "./pages/tools/Base64";
import ImageResizer from "./pages/tools/ImageResize";
import HtmlPreview from "./pages/tools/HtmlPreview";
import MarkdownPreview from "./pages/tools/MarkdownPreview";
import URLEncode from "./pages/tools/URLEncode";

// helper component to reset scroll and search on route change
function ScrollToTop({ setSearchTerm }) {
  const location = useLocation();

  useEffect(() => {
    // reset search input when route changes
    setSearchTerm("");

    // scroll page to top
    window.scrollTo(0, 0);
  }, [location, setSearchTerm]);

  return null;
}

export default function App() {
  // global search state shared with navbar and home
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      {/* listens for route changes */}
      <ScrollToTop setSearchTerm={setSearchTerm} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* top navigation bar */}
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* main content area */}
        <main style={{ flex: 1 }}>
          <Routes>
            {/* home page with search */}
            <Route path="/" element={<Home searchTerm={searchTerm} />} />

            {/* tool routes */}
            <Route path="/json" element={<JsonFormatter />} />
            <Route path="/base64" element={<Base64Tool />} />
            <Route path="/image-resize" element={<ImageResizer />} />
            <Route path="/html-preview" element={<HtmlPreview />} />
            <Route path="/markdown" element={<MarkdownPreview />} />
            <Route path="/url-encode" element={<URLEncode />} />

            {/* legal pages */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* fallback route */}
            <Route path="*" element={<Home searchTerm={searchTerm} />} />
          </Routes>
        </main>

        {/* footer section */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
