'use client';

import { appDataService } from '@/lib/app-data';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TrendingApp {
  id: string;
  name: string;
  developer: string;
  category: string;
  icon: string;
  formattedMetrics?: {
    estimatedRevenue: string;
    estimatedDownloads: string;
  };
  trend: 'up' | 'down' | 'neutral';
  trendPercentage: number;
  ranking: number;
}

export function TrendingApps() {
  const [trendingApps, setTrendingApps] = useState<TrendingApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingApps = async () => {
      try {
        const apps = await appDataService.getTrendingApps(6);
        setTrendingApps(apps as TrendingApp[]);
      } catch (error) {
        console.error('Error loading trending apps:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingApps();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            🔥 Trending Apps
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Loading trending apps...
          </p>
        </div>
      </div>
    );
  }
  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          🔥 Trending Apps
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Discover the fastest-growing apps and their estimated revenue. Updated daily.
        </p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {trendingApps.map((app) => (
          <Link
            key={app.id}
            href={`/app/${app.id}`}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer group block"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center text-2xl">
                    {app.icon}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {app.name}
                    </h3>
                    <span className="text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                      #{app.ranking}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {app.developer} • {app.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {app.formattedMetrics?.estimatedRevenue || 'N/A'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Revenue
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {app.formattedMetrics?.estimatedDownloads || 'N/A'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Downloads
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`font-semibold flex items-center space-x-1 ${getTrendColor(app.trend)}`}>
                    <span>{getTrendIcon(app.trend)}</span>
                    <span>{app.trendPercentage > 0 ? '+' : ''}{app.trendPercentage}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    30d trend
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
          View All Trending Apps
        </button>
      </div>
    </div>
  );
}