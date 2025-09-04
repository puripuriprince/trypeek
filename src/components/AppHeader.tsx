interface AppHeaderProps {
  app: {
    name: string;
    developer: string;
    category: string;
    icon: string;
    description: string;
    rating: number;
    reviewCount: string;
    estimatedRevenue: string;
    estimatedDownloads: string;
    price: string;
    ageRating: string;
    size: string;
    lastUpdated: string;
    version: string;
    platforms: string[];
    countries: string[];
  };
}

export function AppHeader({ app }: AppHeaderProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center text-5xl shadow-lg">
            {app.icon}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {app.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-1">
                {app.developer}
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                <span>{app.category}</span>
                <span>•</span>
                <span>{app.price}</span>
                <span>•</span>
                <span>{app.ageRating}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end space-y-2">
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(app.rating) ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {app.rating}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  ({app.reviewCount})
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                <span>{app.size}</span>
                <span>•</span>
                <span>v{app.version}</span>
              </div>
            </div>
          </div>
          
          <p className="text-slate-700 dark:text-slate-300 mt-4 leading-relaxed">
            {app.description}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Platforms:</span>
              <div className="flex space-x-1">
                {app.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Top Markets:</span>
              <div className="flex space-x-1">
                {app.countries.slice(0, 3).map((country) => (
                  <span
                    key={country}
                    className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}