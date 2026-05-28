import { Link } from "react-router-dom";

export default function ContentPageLayout({
  title,
  description,
  sections = [],
}) {
  return (
    <main className="policy-container">
      <h1>{title}</h1>

      <p>{description}</p>

      {sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>

          {section.content && <p>{section.content}</p>}

          {section.links?.length > 0 && (
            <ul>
              {section.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
}