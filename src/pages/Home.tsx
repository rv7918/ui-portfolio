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
      <section className="bg-[#faf9f7] py-16 sm:py-20 lg:py-24 -mt-25">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <p className="text-[#5c5c5c] text-center">Loading case studies…</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-20 sm:gap-25 list-none p-0 m-0">
              {cases.map((caseStudy: any) => (
                <li key={caseStudy.sys.id}>
                  <HomeCard caseStudy={caseStudy} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
