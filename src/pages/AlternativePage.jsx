import { useParams } from "react-router-dom";
import SEO from "../components/SEO";
import ContentPageLayout from "../content/ContentPageLayout";
import { alternatives } from "../content/alternatives";
import { createBreadcrumbSchema } from "../seo/jsonLd";
import { SITE_NAME } from "../seo/site";
import { tools } from "../tools";

export default function AlternativePage() {
  const { slug } = useParams();

  const alternative = alternatives.find((item) => item.slug === slug);

  if (!alternative) {
    return null;
  }

  const path = `/alternatives/${alternative.slug}`;

  return (
    <>
      <SEO
        title={`${alternative.title} - ${SITE_NAME}`}
        description={alternative.description}
        path={path}
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: alternative.title, path },
        ])}
      />

      <ContentPageLayout
        title={alternative.title}
        description={alternative.intro}
        sections={[
          {
            title: `Why use TransformJS instead of ${alternative.comparedTool}?`,
            content: alternative.description,
          },

          {
            title: "Advantages",
            links: alternative.pros.map((item) => ({
              to: "/",
              label: item,
            })),
          },

          {
            title: "Recommended tools",
             links: alternative.relatedTools
            .map((path) => {
      const tool = tools.find((item) => item.path === path);

      if (!tool) {
        return null;
      }

      return {
        to: tool.path,
        label: tool.name,
      };
    })
    .filter(Boolean),
}
        ]}
      />
    </>
  );
}