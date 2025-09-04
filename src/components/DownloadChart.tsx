'use client';

import { useState } from 'react';

interface DownloadChartProps {
  appId: string;
}

// Mock data - in real app this would come from API
const generateMockData = (days: number) => {
  const data = [];
  const baseDownloads = 1500000; // 1.5M daily downloads
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const variation = Math.random() * 0.4 - 0.2; // ±20% variation
    const downloads = Math.round(baseDownloads * (1 + variation));
    
    data.push({
      date: date.toISOString().split('T')[0],
      downloads: downloads,
      formattedDownloads: `${(downloads / 1000000).toFixed(2)}M`
    });
  }
  
  return data;
};

export function DownloadChart({ appId }: DownloadChartProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  const getDays = (range: string) => {
    switch (range) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 30;
    }
  };
  
  const data = generateMockData(getDays(timeRange));
  const maxDownloads = Math.max(...data.map(d => d.downloads));
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          📱 Download Trend
        </h3>
        <div className="flex space-x-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as '7d' | '30d' | '90d')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-1">
        {data.map((point, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center group"
          >
            <div className="relative w-full">
              <div
                className="bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm transition-all duration-300 hover:from-green-700 hover:to-green-500"
                style={{
                  height: `${(point.downloads / maxDownloads) * 200}px`,
                  minHeight: '8px'
                }}
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                <div className="font-medium">{point.formattedDownloads}</div>
                <div className="text-slate-300 dark:text-slate-400">
                  {new Date(point.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          {new Date(data[0].date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
        <span>Today</span>
      </div>
      
      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Average Daily Downloads</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {(data.reduce((sum, d) => sum + d.downloads, 0) / data.length / 1000000).toFixed(2)}M
          </span>
        </div>
      </div>
    </div>
  );
}