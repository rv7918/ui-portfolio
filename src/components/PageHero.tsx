const PageHero = ({ data }: { data: any }) => {
  return (
<section className="w-full bg-sky-100 text-gray-700">
<div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-12 lg:py-16 gap-4 md:gap-6">
  <p className="text-4xl md:text-4xl lg:text-5xl font-semibold text-center md:text-left">{data?.title}</p>
  <p className="text-lg md:text-xl lg:text-2xl text-center md:text-left">{data?.summary}</p>
</div>
</section>
  );
};

export default PageHero;



