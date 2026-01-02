import { fetchGraphQL } from "../lib/contentfulGraphql";

export const getHomepageData = async () => {
  const query = `
    {
      uiSiteIntroCollection(limit: 1) {
        items {
          headline
          subheadline
        }
      }
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
  return res.data;
};
