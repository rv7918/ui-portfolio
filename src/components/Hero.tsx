import { useQuery } from "@tanstack/react-query";
import { getHomepageData } from "../api/homepage.graphql";

const Hero = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepageData,
  });

  if (isLoading) {
    return (
      <section className="py-20 sm:py-28 bg-[#faf9f7]">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse font-sans text-lg text-[#5c5c5c]">Loading…</div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="py-20 bg-[#faf9f7]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#5c5c5c]">Something went wrong.</p>
        </div>
      </section>
    );
  }

  const intro = data?.uiSiteIntroCollection?.items?.[0];
  const headline = intro?.headline ?? "Design & Develop";
  const subheadline = intro?.subheadline ?? "Full stack product and design.";

  return (
    <section className="w-full bg-[#faf9f7] pt-12 sm:pt-16 pb-20 sm:pb-28">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1a1a1a]">
          {/^Hi[,!]?\s/i.test(headline) ? headline : `${headline}.`}
        </h1>
        <p className="mt-6 font-sans text-base sm:text-lg text-[#1a1a1a] leading-relaxed max-w-2xl mx-auto">
          {subheadline.includes("**")
            ? subheadline.split(/\*\*([^*]+)\*\*/).map((part: string, i: number) =>
                i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
              )
            : subheadline}
        </p>
      </div>
    </section>
  );
};

export default Hero;
