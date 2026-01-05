import { fetchGraphQL } from "../lib/contentfulGraphql";

export const getCaseStudyBySlug = async (slug: string) => {
  const query = `
    {
      uiCaseStudyCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          sys { id }
          title
          slug
          summaryLong
          techStack
          problem
          solution
          process { json }
          outcomeSummary
          coverImage { url }
          userJourneyMap { url title }
          metricsCollection {
            items {
              sys { id }
              title
              metric
              description
            }
          }
          sectionsCollection {
            items {
              sys { id }
              title
              sectionType
              imageLayout
              imagesCollection {
                items {
                  sys { id }
                  url
                  title
                }
              }
            }
          }
        }
      }
    }
  `;
  const res = await fetchGraphQL(query);
  const items = res.data.uiCaseStudyCollection.items;
  return items.length > 0 ? items[0] : null;
};

