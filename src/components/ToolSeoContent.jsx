import { useState } from "react";
import { Link } from "react-router-dom";
import { tools } from "../tools";

export default function ToolSeoContent({ tool }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!tool?.content) {
    return null;
  }

  const { intro, useCases, faq, relatedTools } = tool.content;

  function toggleFaq(index) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="tool-seo-content">
      {intro && (
        <div className="seo-block">
          <h2>About this tool</h2>

          <p>{intro}</p>
        </div>
      )}

      {useCases?.length > 0 && (
        <div className="seo-block">
          <h2>Common use cases</h2>

          <ul className="seo-use-cases">
            {useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {faq?.length > 0 && (
        <div className="seo-block">
          <h2>FAQ</h2>

          <div className="seo-faq-list">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={item.question} className="seo-faq-item">
                  <button
                    className="seo-faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{item.question}</span>

                    <span>{isOpen ? "-" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="seo-faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {relatedTools?.length > 0 && (
        <div className="seo-block">
          <h2>Related tools</h2>

          <div className="related-tools">
            {relatedTools.map((path) => {
              const relatedTool = tools.find((item) => item.path === path);

              return (
                <Link key={path} className="related-tool-link" to={path}>
                  {relatedTool?.name || path.replace("/", "")}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
