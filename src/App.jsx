import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// tool pages imports
import JsonFormatter from "./tools/data/JsonFormatter";
import Base64Tool from "./tools/security/Base64Tool";
import ImageResizer from "./tools/media/ImageResizer";
import HtmlPreview from "./tools/code/HtmlPreview";
import MarkdownPreview from "./tools/code/MarkdownPreview";
import UrlEncoderDecoder from "./tools/security/UrlEncoderDecoder";

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
            <Route path="/url-encode" element={<UrlEncoderDecoder />} />

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
