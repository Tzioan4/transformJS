import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ToolSeoContent from "./components/ToolSeoContent";
import NotFound from "./pages/NotFound";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import { useTheme } from "./ThemeContext";
import { ThemeProvider } from "./ThemeContext";
import ToolErrorFallback from "./components/ToolErrorFallback";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import HubPage from "./pages/HubPage";
import AlternativePage from "./pages/AlternativePage";
import { tools } from "./tools";
import UseCasePage from "./pages/UseCasePage";
import ToolGroupPage from "./pages/groups/ToolGroupPage";
import ToolSwitcherMount from "./components/ToolSwitcherMount";
import ScrollToTopButton from "./components/ScrollToTopButton";
import PageTransition from "./components/PageTransition";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createToolSchema,
  createWebApplicationSchema,
} from "./seo/jsonLd";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    console.error("app error:", error, info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({
        hasError: false,
        error: null,
      });
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
        <PageTransition>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SEO jsonLd={createWebApplicationSchema()} />
                  <Home searchTerm="" />
                </>
              }
            />
            <Route path="/groups/:slug" element={<ToolGroupPage />} />

            {tools.map((tool) => {
              const ToolComponent = tool.component;
              const faqSchema = createFaqSchema(tool.content?.faq || []);

              return (
                <Route
                  key={tool.path}
                  path={tool.path}
                  element={
                    <>
                      <SEO
                        title={tool.seoTitle || `${tool.name} - TransformJS`}
                        description={tool.seoDesc || tool.description}
                        path={tool.path}
                        jsonLd={[
                          createToolSchema(tool),
                          createBreadcrumbSchema([
                            {
                              name: "Home",
                              path: "/",
                            },
                            {
                              name: tool.name,
                              path: tool.path,
                            },
                          ]),
                          ...(faqSchema ? [faqSchema] : []),
                        ]}
                      />

                      <div className="tool-page-content">
                        <ToolComponent
                          tips={tool.tips}
                          category={tool.tags?.[0]}
                        />
                        <ToolSeoContent tool={tool} />
                      </div>
                    </>
                  }
                />
              );
            })}

            <Route
              path="/privacy"
              element={
                <>
                  <SEO
                    title="Privacy Policy - TransformJS"
                    description="Read our privacy policy. Your data never leaves your device because everything runs locally in your browser."
                    path="/privacy"
                  />
                  <Privacy />
                </>
              }
            />

            <Route
              path="/about"
              element={
                <>
                  <SEO
                    title="About TransformJS - Developer Toolkit"
                    description="Learn more about TransformJS, a fast, lightweight collection of browser-based developer utilities."
                    path="/about"
                  />
                  <About />
                </>
              }
            />
            <Route path="/hub/:slug" element={<HubPage />} />
            <Route path="/alternatives/:slug" element={<AlternativePage />} />
            <Route path="/use-cases/:slug" element={<UseCasePage />} />
            <Route path="/groups/:slug" element={<ToolGroupPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </AppErrorBoundary>
  );
}

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const { toggleTheme } = useTheme();

  useKeyboardShortcuts({
    toggleTheme,
  });

  return (
    <>
      <ScrollToTop setSearchTerm={setSearchTerm} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ToolSwitcherMount />

        <main style={{ flex: 1 }}>
          <AppRoutes searchTerm={searchTerm} />
        </main>

        <Footer />
        <ScrollToTopButton />
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