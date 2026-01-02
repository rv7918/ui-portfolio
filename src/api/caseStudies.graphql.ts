import { fetchGraphQL } from "../lib/contentfulGraphql";

export const getCaseStudies = async () => {
  const query = `
    {
      uiCaseStudyCollection {
        items {
          sys { id }
          title
          slug
          summaryLong
          coverImage { url }
        }
      }
    }
  `;
  const res = await fetchGraphQL(query);
  return res.data.uiCaseStudyCollection.items;
};
