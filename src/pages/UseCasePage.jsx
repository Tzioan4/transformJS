import { useParams } from "react-router-dom";
import SEO from "../components/SEO";
import ContentPageLayout from "../content/ContentPageLayout";
import { useCases } from "../content/useCases";
import { tools } from "../tools";
import { createBreadcrumbSchema } from "../seo/jsonLd";
import { SITE_NAME } from "../seo/site";

export default function UseCasePage() {
  const { slug } = useParams();
  const useCase = useCases.find((item) => item.slug === slug);

  if (!useCase) {
    return null;
  }

  const path = `/use-cases/${useCase.slug}`;

  const relatedTools = useCase.tools
    .map((path) => tools.find((tool) => tool.path === path))
    .filter(Boolean);

  return (
    <>
      <SEO
        title={`${useCase.title} - ${SITE_NAME}`}
        description={useCase.description}
        path={path}
        jsonLd={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: useCase.title, path },
        ])}
      />

      <ContentPageLayout
        title={useCase.title}
        description={useCase.description}
        sections={[
          {
            title: "Recommended tools",
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