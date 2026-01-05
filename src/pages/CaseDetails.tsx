import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCaseStudyBySlug } from "../api/caseStudy.graphql";
import PageHero from "../components/PageHero";
import RichText from "../components/RichText";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NDA from "../components/Nda";
import MetricCards from "../components/MetricCards";

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

  // Collect all images from all sections for lightbox
  const allImages: Array<{ src: string; alt: string }> = [];
  caseStudy.sectionsCollection?.items?.forEach((section: any) => {
    section.imagesCollection?.items?.forEach((image: any) => {
      if (image.url) {
        allImages.push({
          src: image.url,
          alt: image.title || `${caseStudy.title} - ${section.title}`,
        });
      }
    });
  });
  
  // Add user journey map to lightbox images
  if (caseStudy.userJourneyMap?.url) {
    allImages.push({
      src: caseStudy.userJourneyMap.url,
      alt: caseStudy.userJourneyMap.title || `${caseStudy.title} - User Journey Map`,
    });
  }

  const openLightbox = (imageUrl: string) => {
    const index = allImages.findIndex(img => img.src === imageUrl);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const getGridClass = (layout: string) => {
    switch (layout) {
      case "grid-2":
        return "grid grid-cols-1 md:grid-cols-2 gap-8";
      case "grid-3":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
      case "grid-4":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8";
      default:
        return "grid grid-cols-1 gap-6";
    }
  };

  return (
    <>
      <PageHero data={caseStudy} />
      <article className="space-y-8 container mx-auto px-4 py-8">
      <NDA />
        {caseStudy.problem && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Problem</h2>
            <p className="text-gray-600 whitespace-pre-line">{caseStudy.problem}</p>
          </section>
        )}

        {caseStudy.solution && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Solution</h2>
            <p className="text-gray-600 whitespace-pre-line">{caseStudy.solution}</p>
          </section>
        )}

        {caseStudy.process?.json && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Process</h2>
            <RichText content={caseStudy.process.json} />
          </section>
        )}

        {caseStudy.techStack && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tech Stack</h2>
            <p className="text-gray-600">{caseStudy.techStack}</p>
          </section>
        )}

        {caseStudy.outcomeSummary && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Outcome</h2>
            <p className="text-gray-700 whitespace-pre-line">{caseStudy.outcomeSummary}</p>
          </section>
        )}

        {caseStudy.sectionsCollection?.items?.map((section: any) => {
          const isMeridanUI = section.title?.toLowerCase().includes("meridian ui");
          return (
            <section key={section.sys.id} className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">{section.title}</h2>
              {section.imagesCollection?.items && section.imagesCollection.items.length > 0 && (
                <div className={getGridClass(section.imageLayout || "grid-1")}>
                  {section.imagesCollection.items.map((image: any) => (
                    <img
                      key={image.sys.id}
                      src={image.url}
                      alt={image.title || section.title}
                      className={`w-full h-auto cursor-pointer hover:opacity-90 transition-opacity ${
                        isMeridanUI ? "border-2 border-gray-400 rounded-lg" : ""
                      }`}
                      onClick={() => openLightbox(image.url)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {caseStudy?.userJourneyMap && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Journey Map</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={caseStudy.userJourneyMap.url} 
                  alt={caseStudy.userJourneyMap.title} 
                  className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openLightbox(caseStudy.userJourneyMap.url)}
                />
              </div>
              <div>
                {caseStudy.metricsCollection?.items && caseStudy.metricsCollection.items.length > 0 && (
                  <MetricCards
                    title="Validation Results"
                    metrics={caseStudy.metricsCollection.items.map((metric: any) => ({
                      title: metric.title,
                      metric: metric.metric,
                      description: metric.description,
                    }))}
                    columns={2}
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {!caseStudy?.userJourneyMap && caseStudy.metricsCollection?.items && caseStudy.metricsCollection.items.length > 0 && (
          <section>
            <MetricCards
              title="Validation Results"
              metrics={caseStudy.metricsCollection.items.map((metric: any) => ({
                title: metric.title,
                metric: metric.metric,
                description: metric.description,
              }))}
              columns={4}
            />
          </section>
        )}
      </article>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={allImages}
      />
    </>
  );
};

export default CaseDetails;

