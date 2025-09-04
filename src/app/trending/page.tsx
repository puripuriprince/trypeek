import { Navigation } from '@/components/Navigation';
import { TrendingApps } from '@/components/TrendingApps';

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            📈 Trending Apps
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Right Now
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover the fastest-growing apps across all platforms and categories. 
            Updated in real-time with the latest market intelligence.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 shadow-md">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">2.1M+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Apps Tracked</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 shadow-md">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24h</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Update Frequency</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 shadow-md">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">95%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Accuracy Rate</div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">All Categories</button>
            <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Games</button>
            <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Social</button>
            <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Entertainment</button>
            <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Productivity</button>
            <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">Finance</button>
          </div>
          
          <TrendingApps />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              🚀 Want More Insights?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Get unlimited access to app analytics, revenue estimates, and growth trends. 
              Perfect for developers, investors, and market researchers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all">
              View Pricing
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}