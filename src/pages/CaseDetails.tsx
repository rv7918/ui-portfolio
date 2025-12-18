import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCaseStudyBySlug } from "../api/caseStudy.graphql";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PageHero from "../components/PageHero";

const CaseDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ["case-study", slug],
    queryFn: () => getCaseStudyBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <div className="container mx-auto px-4 py-8"><p>Loading…</p></div>;
  if (error) return <div className="container mx-auto px-4 py-8"><p>Error loading case study</p></div>;
  if (!caseStudy) return <div className="container mx-auto px-4 py-8"><p>Case study not found</p></div>;

  return (
    <>
      <PageHero data={caseStudy} />
      <article className="space-y-6 container mx-auto px-4 py-8">
        {caseStudy.body?.json && (
          <div className="prose max-w-none text-gray-700 text-lg">
            {documentToReactComponents(caseStudy.body.json)}
          </div>
        )}

        {caseStudy.systemDiagram?.url && (
          <div>
            <h2 className="text-2xl font-semibold pt-3 text-gray-700">System Diagram</h2>
            <img 
              src={caseStudy.systemDiagram.url} 
              alt={`${caseStudy.title} - System Diagram`} 
              className="w-full h-auto block m-0 p-0"
            />
          </div>
        )}

        {caseStudy.dataFlowDiagram?.url && (
          <div>
            <h2 className="text-2xl font-semibold pt-4 text-gray-700">Data Flow Diagram</h2>
            <img 
              src={caseStudy.dataFlowDiagram.url} 
              alt={`${caseStudy.title} - Data Flow Diagram`} 
              className="w-full h-auto block m-0 p-0"
            />
          </div>
        )}

        {caseStudy.sequenceDiagram?.url && (
          <div>
            <h2 className="text-2xl font-semibold pt-4 text-gray-700">Sequence Diagram</h2>
            <img 
              src={caseStudy.sequenceDiagram.url} 
              alt={`${caseStudy.title} - Sequence Diagram`} 
              className="w-full h-auto block m-0 p-0"
            />
          </div>
        )}
      </article>
    </>
  );
};

export default CaseDetails;

