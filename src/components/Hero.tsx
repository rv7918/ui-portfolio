import { useQuery } from "@tanstack/react-query";
import { getHomepageData } from "../api/homepage.graphql";

const Hero = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepageData,
  });

  if (isLoading) return <div className="container mx-auto flex items-center justify-center py-8"><p>Loading…</p></div>;
  if (error) return <div className="container mx-auto flex items-center justify-center py-8"><p>Error</p></div>;

  const intro = data?.uiSiteIntroCollection.items[0];

  return (
    <section className="w-full bg-cyan-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-12 lg:py-16 gap-4 md:gap-6">
        <p className="text-4xl md:text-4xl lg:text-5xl font-medium text-center md:text-left">{intro?.headline}</p>
        <p className="text-lg md:text-xl lg:text-2xl text-center md:text-left">{intro?.subheadline}</p>
      </div>
    </section>
  );
};

export default Hero;
