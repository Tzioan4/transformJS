import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { useCases } from "../content/useCases";
import { tools } from "../tools";
import { createBreadcrumbSchema } from "../seo/jsonLd";
import { SITE_NAME } from "../seo/site";
import "../styles/pages/use-case-page.css";

export default function UseCasePage() {
  const { slug } = useParams();

  const useCase = useCases.find((item) => item.slug === slug);

  if (!useCase) {
    return null;
  }

  const path = `/use-cases/${useCase.slug}`;

  const relatedTools = useCase.tools
    .map((toolPath) => tools.find((tool) => tool.path === toolPath))
    .filter(Boolean);

  return (
    <>
      <SEO
        title={useCase.seoTitle || `${useCase.title} - ${SITE_NAME}`}
        description={useCase.seoDesc || useCase.description}
        path={path}
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: useCase.title, path },
        ])}
      />

      <main className="use-case-page">
        <section className="use-case-hero">
          <div className="use-case-eyebrow">Developer workflow</div>

          <h1>{useCase.title}</h1>

          <p>{useCase.description}</p>
        </section>

        <section className="use-case-intro-card">
          <h2>Workflow overview</h2>
          <p>{useCase.intro}</p>
        </section>

        <section className="use-case-section">
          <h2>Recommended tools</h2>

          <div className="use-case-tool-grid">
            {relatedTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="use-case-tool-card"
              >
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {useCase.links?.length > 0 && (
          <section className="use-case-section">
            <h2>Related pages</h2>

            <div className="use-case-links">
              {useCase.links.map((link) => (
                <Link key={link.to} to={link.to} className="use-case-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="use-case-privacy-card">
          <h2>Browser-based and privacy-first</h2>
          <p>
            TransformJS keeps these workflows local in your browser. You can
            inspect, format, convert, and compare developer data without
            creating an account or sending tool input to a server for
            processing.
          </p>
        </section>
      </main>
    </>
  );
}
