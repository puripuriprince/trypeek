import { Navigation } from '@/components/Navigation';

export default function CategoriesPage() {
  const categories = [
    { name: 'Games', icon: '🎮', count: '534.2K', growth: '+12%', description: 'Mobile and social games across all genres' },
    { name: 'Social', icon: '👥', count: '89.1K', growth: '+8%', description: 'Social networking and communication apps' },
    { name: 'Photo & Video', icon: '📷', count: '156.7K', growth: '+15%', description: 'Photo editing, video creation, and sharing' },
    { name: 'Entertainment', icon: '🎬', count: '201.3K', growth: '+6%', description: 'Streaming, media, and entertainment platforms' },
    { name: 'Shopping', icon: '🛒', count: '78.4K', growth: '+18%', description: 'E-commerce, marketplace, and retail apps' },
    { name: 'Productivity', icon: '💼', count: '142.8K', growth: '+9%', description: 'Business, productivity, and workflow tools' },
    { name: 'Music', icon: '🎵', count: '67.5K', growth: '+4%', description: 'Music streaming, creation, and discovery' },
    { name: 'Finance', icon: '💰', count: '92.6K', growth: '+22%', description: 'Banking, investing, and financial services' },
    { name: 'Health & Fitness', icon: '💪', count: '123.9K', growth: '+14%', description: 'Health tracking, fitness, and wellness' },
    { name: 'Travel', icon: '✈️', count: '45.2K', growth: '+7%', description: 'Travel booking, navigation, and tourism' },
    { name: 'Food & Drink', icon: '🍕', count: '38.7K', growth: '+11%', description: 'Food delivery, recipes, and dining' },
    { name: 'Education', icon: '📚', count: '167.3K', growth: '+16%', description: 'Learning, courses, and educational content' },
  ];

  const topGrowthCategories = categories.sort((a, b) => parseFloat(b.growth.replace('%', '')) - parseFloat(a.growth.replace('%', ''))).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            App Categories
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              & Market Insights
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore app markets across all major categories. Track trends, 
            analyze competition, and discover opportunities.
          </p>
        </div>

        {/* Top Growth Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            🚀 Fastest Growing Categories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {topGrowthCategories.map((category, index) => (
              <div key={category.name} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white px-3 py-1 text-sm font-medium">
                  #{index + 1}
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category.name}</h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-slate-600 dark:text-slate-400">{category.count} apps</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">{category.growth}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  {category.description}
                </p>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all">
                  Explore Category
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* All Categories Grid */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            📱 All Categories
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.name} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer group">
                <div className="text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{category.count}</span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      {category.growth}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Dive Deeper? 🔍
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get detailed analytics, revenue estimates, and competitor insights 
            for any app in any category. Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all">
              View Demo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}