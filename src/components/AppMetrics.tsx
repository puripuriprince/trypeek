interface AppMetricsProps {
  app: {
    formattedMetrics: {
      estimatedRevenue: string;
      estimatedDownloads: string;
    };
    estimates: {
      revenue: {
        monthlyRevenue: number;
        growth?: number;
      };
      downloads: {
        monthlyDownloads: number;
        growth?: number;
      };
      growth: {
        revenueGrowthRate: number;
        downloadGrowthRate: number;
      };
    };
    ranking: number;
  };
}

export function AppMetrics({ app }: AppMetricsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getTrendColor = (growth: number) => {
    if (growth > 0) return 'text-green-600 dark:text-green-400';
    if (growth < 0) return 'text-red-600 dark:text-red-400';
    return 'text-slate-600 dark:text-slate-400';
  };

  const getTrendIcon = (growth: number) => {
    if (growth > 0) return '↗️';
    if (growth < 0) return '↘️';
    return '➡️';
  };

  const metrics = [
    {
      title: 'Estimated Monthly Revenue',
      value: app.formattedMetrics.estimatedRevenue,
      growth: app.estimates.growth.revenueGrowthRate,
      subtitle: `Based on ${formatNumber(app.estimates.revenue.monthlyRevenue)} monthly estimate`,
    },
    {
      title: 'Estimated Monthly Downloads',
      value: app.formattedMetrics.estimatedDownloads,
      growth: app.estimates.growth.downloadGrowthRate,
      subtitle: `Based on ${formatNumber(app.estimates.downloads.monthlyDownloads)} monthly estimate`,
    },
    {
      title: 'Overall Ranking',
      value: `#${app.ranking}`,
      growth: Math.random() > 0.5 ? 5 : -3, // Simulate ranking change
      subtitle: `Current position in category`,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {metric.title}
            </h3>
            <div className={`flex items-center space-x-1 ${getTrendColor(metric.growth)}`}>
              <span className="text-lg">{getTrendIcon(metric.growth)}</span>
              <span className="text-sm font-medium">
                {metric.growth > 0 ? '+' : ''}{metric.growth.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {metric.value}
            </div>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {metric.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}