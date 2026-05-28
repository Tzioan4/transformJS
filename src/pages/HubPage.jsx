import { useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { hubs } from "../content/hubs";
import { tools } from "../tools";
import { createBreadcrumbSchema } from "../seo/jsonLd";
import { SITE_NAME } from "../seo/site";
import ContentPageLayout from "../content/ContentPageLayout";

export default function HubPage() {
  const { slug } = useParams();
  const hub = hubs.find((item) => item.slug === slug);

  if (!hub) {
    return null;
  }

  const relatedTools = hub.tools
    .map((path) => tools.find((tool) => tool.path === path))
    .filter(Boolean);

  const path = `/hub/${hub.slug}`;

return (
  <>
    <SEO
      title={`${hub.title} - ${SITE_NAME}`}
      description={hub.description}
      path={path}
      jsonLd={createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: hub.title, path },
      ])}
    />

    <ContentPageLayout
      title={hub.title}
      description={hub.description}
      sections={[
        {
          title: "Related tools",
          links: relatedTools.map((tool) => ({
            to: tool.path,
            label: tool.name,
          })),
        },
      ]}
    />
  </>
);
}