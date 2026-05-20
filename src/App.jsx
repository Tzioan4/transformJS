import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NotFound from "./pages/NotFound";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import { useTheme } from "./ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./ThemeContext";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import About from "./pages/About";

import { tools } from "./tools";

const lazyTools = tools.map((tool) => ({
  ...tool,
  lazyComponent: lazy(() =>
    import("./tools/index.jsx").then((module) => {
      const matchedTool = module.tools.find((t) => t.path === tool.path);
      return { default: matchedTool.component };
    }),
  ),
}));

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
  const { toggleTheme } = useTheme();

  useKeyboardShortcuts({ toggleTheme });

  return (
    <>
      <ScrollToTop setSearchTerm={setSearchTerm} />

      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main style={{ flex: 1 }}>
          <Suspense
            fallback={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />

              {lazyTools.map((tool) => {
                const LazyToolComponent = tool.lazyComponent;
                return (
                  <Route
                    key={tool.path}
                    path={tool.path}
                    element={
                      <>
                        <Helmet>
                          <title>
                            {tool.seoTitle || `${tool.name} - TransformJS`}
                          </title>
                          <meta
                            name="description"
                            content={tool.seoDesc || tool.description}
                          />
                          <link
                            rel="canonical"
                            href={`https://transformjs.com${tool.path}`}
                          />
                        </Helmet>
                        <LazyToolComponent tips={tool.tips} />
                      </>
                    }
                  />
                );
              })}

              <Route
                path="/privacy"
                element={
                  <>
                    <Helmet>
                      <title>Privacy Policy - TransformJS</title>
                      <meta
                        name="description"
                        content="Read our privacy policy. Your data never leaves your device - everything runs locally in your browser."
                      />
                      <link
                        rel="canonical"
                        href="https://transformjs.com/privacy"
                      />
                    </Helmet>
                    <Privacy />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Helmet>
                      <title>About TransformJS - Developer Toolkit</title>
                      <meta
                        name="description"
                        content="Learn more about TransformJS, a fast, lightweight, and modern collection of browser-based utilities for everyday workflows."
                      />
                      <link
                        rel="canonical"
                        href="https://transformjs.com/about"
                      />
                    </Helmet>
                    <About />
                  </>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
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
