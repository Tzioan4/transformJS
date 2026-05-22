import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NotFound from "./pages/NotFound";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import { useTheme } from "./ThemeContext";
import ToolErrorFallback from "./components/ToolErrorFallback";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./ThemeContext";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import About from "./pages/About";

import { tools } from "./tools";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("app error:", error, info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return <ToolErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ScrollToTop({ setSearchTerm }) {
  const location = useLocation();

  useEffect(() => {
    setSearchTerm("");
    window.scrollTo(0, 0);
  }, [location, setSearchTerm]);

  return null;
}

function AppRoutes({ searchTerm }) {
  const location = useLocation();

  return (
    <AppErrorBoundary resetKey={location.pathname}>
      <Suspense
        fallback={
          <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
        }
      >
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />

          {tools.map((tool) => {
            const ToolComponent = tool.component;

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

                    <ToolComponent tips={tool.tips} />
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
                    content="Read our privacy policy. Your data never leaves your device — everything runs locally in your browser."
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
                  <link rel="canonical" href="https://transformjs.com/about" />
                </Helmet>
                <About />
              </>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppErrorBoundary>
  );
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
          <AppRoutes searchTerm={searchTerm} />
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
