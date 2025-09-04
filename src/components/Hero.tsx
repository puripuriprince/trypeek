export function Hero() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
        App Market Intelligence
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Made Simple
        </span>
      </h1>
      
      <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
        Track app revenue, downloads, and growth metrics without the enterprise price tag. 
        Perfect for indie developers, small studios, and SaaS founders.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Start Tracking Free
        </button>
        <button className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all">
          View Demo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">500K+</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Apps Tracked</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">95%</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Accuracy</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Real-time</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Updates</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">Free</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">To Start</div>
        </div>
      </div>
    </div>
  );
}