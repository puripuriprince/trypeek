import { SearchBar } from '@/components/SearchBar';
import { TrendingApps } from '@/components/TrendingApps';
import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <Hero />
        <div className="max-w-4xl mx-auto mt-16">
          <SearchBar />
        </div>
        <div className="mt-20">
          <TrendingApps />
        </div>
      </main>
    </div>
  );
}
