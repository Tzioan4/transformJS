import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { alternatives } from "../content/alternatives";
import { createBreadcrumbSchema } from "../seo/jsonLd";
import { SITE_NAME } from "../seo/site";
import { tools } from "../tools";
import "../styles/pages/alternative-page.css";

export default function AlternativePage() {
  const { slug } = useParams();

  const alternative = alternatives.find((item) => item.slug === slug);

  if (!alternative) {
    return null;
  }

  const path = `/alternatives/${alternative.slug}`;

  const recommendedTools = alternative.recommendedTools
    .map((toolPath) => tools.find((tool) => tool.path === toolPath))
    .filter(Boolean);

  return (
    <>
      <SEO
        title={alternative.seoTitle || `${alternative.title} - ${SITE_NAME}`}
        description={alternative.seoDesc}
        path={path}
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: alternative.title, path },
        ])}
      />

      <main className="alternative-page">
        <section className="alternative-hero">
          <div className="alternative-eyebrow">
            Browser-based developer tools
          </div>

          <h1>{alternative.title}</h1>

          <p>{alternative.intro}</p>
        </section>

        <section className="alternative-grid">
          <article className="alternative-card alternative-card-large">
            <h2>How it compares to {alternative.comparedTool}</h2>
            <p>{alternative.comparison}</p>
          </article>

          <article className="alternative-card alternative-card-large">
            <h2>Why use TransformJS instead?</h2>
            <p>{alternative.whyTransformJS}</p>
          </article>
        </section>

        <section className="alternative-section">
          <h2>Key advantages</h2>

          <div className="alternative-card-grid">
            {alternative.highlights.map((item) => (
              <div key={item} className="alternative-card">
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="alternative-section">
          <h2>Recommended tools</h2>

          <div className="alternative-tool-grid">
            {recommendedTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="alternative-tool-card"
              >
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="alternative-section">
          <h2>Explore related pages</h2>

          <div className="alternative-links">
            {alternative.internalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="alternative-link">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="alternative-privacy-card">
          <h2>Privacy-first and no-install by default</h2>
          <p>
            TransformJS runs directly in your browser. It does not require an
            account, does not add tracking, and does not send your tool input to
            a server for processing.
          </p>
        </section>
      </main>
    </>
  );
}
