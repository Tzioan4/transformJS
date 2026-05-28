import { Link, useParams } from "react-router-dom";
import { toolGroups } from "../../data/toolGroups";
import { tools } from "../../tools";
import SEO from "../../components/SEO";
import "../../styles/pages/tool-group-page.css";

export default function ToolGroupPage() {
  const { slug } = useParams();

  const group = toolGroups.find((item) => item.slug === slug);

  if (!group) {
    return <h1>Group not found</h1>;
  }

  const relatedTools = group.tools
    .map((path) => tools.find((tool) => tool.path === path))
    .filter(Boolean);

  return (
    <>
      <SEO
  title={`${group.title} - TransformJS`}
  description={group.description}
  path={`/groups/${group.slug}`}
/>

      <section className="content-page">
        <div className="content-page-container">
          <h1>{group.title}</h1>

          <p>{group.description}</p>

          <div className="tool-group-list">
            {relatedTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="tool-group-card"
              >
                <h2>{tool.name}</h2>
                <p>{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}