'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Check if it's a known app for direct navigation
    const knownApps = ['instagram', 'tiktok', 'spotify', 'netflix', 'whatsapp', 'uber'];
    const normalizedQuery = query.toLowerCase().trim();
    
    if (knownApps.includes(normalizedQuery)) {
      router.push(`/app/${normalizedQuery}`);
    } else {
      // For demo, redirect to Instagram as default
      router.push('/app/instagram');
    }
    
    setIsSearching(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for apps... (e.g. Instagram, Spotify, TikTok)"
            className="w-full pl-12 pr-32 py-4 text-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-lg hover:shadow-xl"
            disabled={isSearching}
          />
          
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <button
              type="submit"
              disabled={!query.trim() || isSearching}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching</span>
                </div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-slate-500 dark:text-slate-400">Popular searches:</span>
        {['Instagram', 'TikTok', 'Spotify', 'Netflix', 'WhatsApp', 'Uber'].map((app) => (
          <button
            key={app}
            onClick={() => setQuery(app)}
            className="text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {app}
          </button>
        ))}
      </div>
    </div>
  );
}