import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCaseStudyBySlug } from "../api/caseStudy.graphql";
import PageHero from "../components/PageHero";
import RichText from "../components/RichText";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const CaseDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ["case-study", slug],
    queryFn: () => getCaseStudyBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <div className="container mx-auto px-4 py-8"><p>Loading…</p></div>;
  if (error) return <div className="container mx-auto px-4 py-8"><p>Error loading case study</p></div>;
  if (!caseStudy) return <div className="container mx-auto px-4 py-8"><p>Case study not found</p></div>;

  // Collect all images for lightbox
  const images = [
    caseStudy.systemDiagram?.url && { src: caseStudy.systemDiagram.url, alt: `${caseStudy.title} - System Diagram` },
    caseStudy.dataFlowDiagram?.url && { src: caseStudy.dataFlowDiagram.url, alt: `${caseStudy.title} - Data Flow Diagram` },
    caseStudy.sequenceDiagram?.url && { src: caseStudy.sequenceDiagram.url, alt: `${caseStudy.title} - Sequence Diagram` },
  ].filter(Boolean) as Array<{ src: string; alt: string }>;

  const openLightbox = (imageUrl: string) => {
    const index = images.findIndex(img => img.src === imageUrl);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <PageHero data={caseStudy} />
      <article className="space-y-6 container mx-auto px-4 py-8">
        <RichText content={caseStudy.body?.json} />

        {caseStudy.systemDiagram?.url && (
          <div>
            <h2 className="text-2xl font-semibold pt-3 text-gray-700 mb-4 mt-3">System Diagram</h2>
            <img 
              src={caseStudy.systemDiagram.url} 
              alt={`${caseStudy.title} - System Diagram`} 
              className="w-full h-auto block m-0 p-0 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(caseStudy.systemDiagram.url)}
            />
          </div>
        )}

        {caseStudy.dataFlowDiagram?.url && (
          <div>
            <h2 className="text-2xl font-semibold pt-4 text-gray-700 mb-4 mt-7">Data Flow Diagram</h2>
            <img 
              src={caseStudy.dataFlowDiagram.url} 
              alt={`${caseStudy.title} - Data Flow Diagram`} 
              className="w-full h-auto block m-0 p-0 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(caseStudy.dataFlowDiagram.url)}
            />
          </div>
        )}

        {caseStudy.sequenceDiagram?.url && (
          <div>
            <h2 className="text-2xl font-semibold pt-4 text-gray-700 mb-4 mt-7">Sequence Diagram</h2>
            <img 
              src={caseStudy.sequenceDiagram.url} 
              alt={`${caseStudy.title} - Sequence Diagram`} 
              className="w-full h-auto block m-0 p-0 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(caseStudy.sequenceDiagram.url)}
            />
          </div>
        )}
      </article>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images}
      />
    </>
  );
};

export default CaseDetails;

