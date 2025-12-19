import PageHero from "../components/PageHero";
import { getAbout } from "../api/about.graphql";
import { useQuery } from "@tanstack/react-query";
import RichText from "../components/RichText";


const About = () => {
  const { data: about, isLoading, error } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  if (isLoading) return <div className="container mx-auto px-4 py-8"><p>Loading…</p></div>;
  if (error) return <div className="container mx-auto px-4 py-8"><p>Error loading about</p></div>;
  if (!about) return <div className="container mx-auto px-4 py-8"><p>About not found</p></div>;
  return (
    <>
      <PageHero data={{ title: about.title, summary: about.summary }} />
      <div className="container mx-auto px-4 py-8">
        <RichText content={about.richBody?.json} />
      </div>
    </>
  );
};

export default About;

