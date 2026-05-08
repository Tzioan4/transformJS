import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// importing all the tool pages from the tools folder
import JsonFormatter from "./pages/tools/JsonFormatter";
import Base64Tool from "./pages/tools/Base64";
import ImageResizer from "./pages/tools/ImageResize";
import HtmlPreview from "./pages/tools/HtmlPreview";
import MarkdownPreview from "./pages/tools/MarkdownPreview";

export default function App() {
  // state to keep track of what the user is searching for
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      {/* passing search state to navbar so it can update it */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* main area where pages change */}
      <main style={{ minHeight: "100vh" }}>
        <Routes>
          {/* the main dashboard page */}
          <Route path="/" element={<Home searchTerm={searchTerm} />} />

          {/* routes for each specific tool */}
          <Route path="/json" element={<JsonFormatter />} />
          <Route path="/base64" element={<Base64Tool />} />
          <Route path="/image-resize" element={<ImageResizer />} />
          <Route path="/html-preview" element={<HtmlPreview />} />
          <Route path="/markdown" element={<MarkdownPreview />} />

          {/* if the user goes to a wrong link it just sends them home */}
          <Route path="*" element={<Home searchTerm={searchTerm} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
