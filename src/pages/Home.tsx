import Hero from "../components/Hero";
import { useQuery } from "@tanstack/react-query";
import { getCaseStudies } from "../api/caseStudies.graphql";
import HomeCard from "../components/HomeCard";

const Home = () => {
  const { data: cases = [], isLoading } = useQuery({
    queryKey: ["case-studies"],
    queryFn: getCaseStudies,
  });

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-700">Case Studies</h2>
        {isLoading ? (
          <p>Loading case studies...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cases.map((caseStudy: any) => (
                <HomeCard key={caseStudy.sys.id} caseStudy={caseStudy} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
