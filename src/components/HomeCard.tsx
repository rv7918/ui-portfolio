import { Link } from "react-router-dom";

const HomeCard = ({ caseStudy }: { caseStudy: any }) => {
  return (
    <article className="group">
      <Link
        to={`/case/${caseStudy.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2 rounded-lg"
      >
        <div className="overflow-hidden rounded-lg bg-[#e8e6e3] aspect-[4/3] mb-6">
          {caseStudy?.coverImage?.url ? (
            <img
              src={caseStudy.coverImage.url}
              alt={caseStudy?.title ?? ""}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#5c5c5c] font-sans text-sm">
              No image
            </div>
          )}
        </div>
        <h3 className="font-display text-xl font-bold text-[#1a1a1a] tracking-tight">
          {caseStudy?.title}
        </h3>
        <p className="mt-2 font-sans text-sm text-[#1a1a1a] leading-relaxed line-clamp-2">
          {caseStudy?.summaryLong ?? caseStudy?.summary}
        </p>
      </Link>
    </article>
  );
};

export default HomeCard;
