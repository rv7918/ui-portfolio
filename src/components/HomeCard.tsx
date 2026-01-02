import { Link } from "react-router-dom";

const HomeCard = ({ caseStudy }: { caseStudy: any }) => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-slate-200">
      <Link
        key={caseStudy.sys.id}
        to={`/case/${caseStudy.slug}`}
        className=""
      >
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{caseStudy?.title}</h3>
        <p className="text-gray-600 mb-5 text-gray-800 font-normal">{caseStudy?.summaryLong}</p>
        <img
          src={caseStudy?.coverImage?.url}
          alt={caseStudy?.title}
          className="w-full h-auto"
        />
        <button className="!bg-slate-700 text-white px-4 py-2 rounded-lg mt-5">View Case Study</button>
      </Link>
    </div>
  );
};

export default HomeCard;
