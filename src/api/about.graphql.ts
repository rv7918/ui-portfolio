import { fetchGraphQL } from "../lib/contentfulGraphql";

export const getAbout = async () => {
  const query = `
    {
      uiAboutCollection(limit: 1) {
        items {
          title
          summary
          body
          richBody { json }
        }
      }
    }
  `;
  const res = await fetchGraphQL(query);
  return res.data.uiAboutCollection.items[0];
};
