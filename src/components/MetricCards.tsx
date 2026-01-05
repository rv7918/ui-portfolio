interface MetricCard {
  title: string;
  metric: string;
  description?: string;
}

interface MetricCardsProps {
  title?: string;
  metrics: MetricCard[];
  columns?: 1 | 2 | 3 | 4;
}

const MetricCards = ({ title, metrics, columns = 2 }: MetricCardsProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 -mt-10">{title}</h2>
      )}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 h-55 flex flex-col items-center justify-center text-center"
          >
            <h3 className="text-base font-medium text-gray-900 mb-2">
              {metric.title}
            </h3>
            <div className="mb-2">
              <span className="text-2xl font-bold text-gray-900">
                {metric.metric}
              </span>
            </div>
            {metric.description && (
              <p className="text-sm text-blue-600">{metric.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricCards;

