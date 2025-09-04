'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              TryPeek<span className="text-blue-600">.ai</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/trending" 
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Trending
            </Link>
            <Link 
              href="/categories" 
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/insights" 
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Insights
            </Link>
            <Link 
              href="/pricing" 
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
              Start Free
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="space-y-2">
              <Link href="/trending" className="block py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                Trending
              </Link>
              <Link href="/categories" className="block py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                Categories
              </Link>
              <Link href="/insights" className="block py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                Insights
              </Link>
              <Link href="/pricing" className="block py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                Pricing
              </Link>
              <div className="pt-4 space-y-2">
                <button className="block w-full text-left py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Sign In
                </button>
                <button className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all">
                  Start Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}