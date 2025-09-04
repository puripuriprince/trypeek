import { metricsCalculator } from './metrics-calculator';

export interface App {
  id: string;
  name: string;
  developer: string;
  category: string;
  icon: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: number;
  ageRating: string;
  size: string;
  lastUpdated: string;
  version: string;
  platforms: ('iOS' | 'Android')[];
  countries: string[];
  ranking: number;
  reviews: number;
  downloads: number;
  inAppPurchases: boolean;
  subscriptions: boolean;
  ageInDays: number;
}

// Mock app database - in real app this would be from external API/database
const mockApps: Record<string, App> = {
  'instagram': {
    id: 'instagram',
    name: 'Instagram',
    developer: 'Meta Platforms, Inc.',
    category: 'Photo & Video',
    icon: '📷',
    description: 'Create and share photos, stories, and videos with the people you love.',
    rating: 4.5,
    reviewCount: 15200000,
    price: 0,
    ageRating: '12+',
    size: '215.6 MB',
    lastUpdated: '2025-01-15',
    version: '315.0.0',
    platforms: ['iOS', 'Android'],
    countries: ['US', 'UK', 'CA', 'AU', 'DE'],
    ranking: 3,
    reviews: 15200000,
    downloads: 3000000000, // 3B total downloads
    inAppPurchases: false,
    subscriptions: false,
    ageInDays: 5110 // ~14 years old
  },
  'tiktok': {
    id: 'tiktok',
    name: 'TikTok',
    developer: 'ByteDance Ltd.',
    category: 'Entertainment',
    icon: '🎵',
    description: 'Create, share and discover short videos.',
    rating: 4.4,
    reviewCount: 8900000,
    price: 0,
    ageRating: '12+',
    size: '158.3 MB',
    lastUpdated: '2025-01-10',
    version: '32.5.3',
    platforms: ['iOS', 'Android'],
    countries: ['US', 'UK', 'CA', 'AU', 'DE'],
    ranking: 1,
    reviews: 8900000,
    downloads: 2800000000,
    inAppPurchases: true,
    subscriptions: false,
    ageInDays: 2555 // ~7 years old
  },
  'spotify': {
    id: 'spotify',
    name: 'Spotify',
    developer: 'Spotify Ltd.',
    category: 'Music',
    icon: '🎧',
    description: 'Stream music and podcasts for free.',
    rating: 4.7,
    reviewCount: 6700000,
    price: 0,
    ageRating: '4+',
    size: '89.2 MB',
    lastUpdated: '2025-01-12',
    version: '8.8.52',
    platforms: ['iOS', 'Android'],
    countries: ['US', 'UK', 'CA', 'AU', 'DE'],
    ranking: 8,
    reviews: 6700000,
    downloads: 1200000000,
    inAppPurchases: false,
    subscriptions: true,
    ageInDays: 4380 // ~12 years old
  },
  'netflix': {
    id: 'netflix',
    name: 'Netflix',
    developer: 'Netflix, Inc.',
    category: 'Entertainment',
    icon: '🎬',
    description: 'Watch TV shows & movies anytime, anywhere.',
    rating: 4.2,
    reviewCount: 3400000,
    price: 0,
    ageRating: '17+',
    size: '234.1 MB',
    lastUpdated: '2025-01-08',
    version: '15.45.1',
    platforms: ['iOS', 'Android'],
    countries: ['US', 'UK', 'CA', 'AU', 'DE'],
    ranking: 15,
    reviews: 3400000,
    downloads: 800000000,
    inAppPurchases: false,
    subscriptions: true,
    ageInDays: 4745 // ~13 years old
  },
  'whatsapp': {
    id: 'whatsapp',
    name: 'WhatsApp',
    developer: 'Meta Platforms, Inc.',
    category: 'Social',
    icon: '💬',
    description: 'Simple. Reliable. Secure messaging.',
    rating: 4.6,
    reviewCount: 12100000,
    price: 0,
    ageRating: '4+',
    size: '145.8 MB',
    lastUpdated: '2025-01-14',
    version: '24.1.78',
    platforms: ['iOS', 'Android'],
    countries: ['US', 'UK', 'CA', 'AU', 'DE'],
    ranking: 5,
    reviews: 12100000,
    downloads: 5000000000, // 5B downloads
    inAppPurchases: false,
    subscriptions: false,
    ageInDays: 5840 // ~16 years old
  },
  'uber': {
    id: 'uber',
    name: 'Uber',
    developer: 'Uber Technologies, Inc.',
    category: 'Travel',
    icon: '🚗',
    description: 'Request a ride, hop in, and go.',
    rating: 4.1,
    reviewCount: 2800000,
    price: 0,
    ageRating: '4+',
    size: '312.4 MB',
    lastUpdated: '2025-01-11',
    version: '4.478.10001',
    platforms: ['iOS', 'Android'],
    countries: ['US', 'UK', 'CA', 'AU', 'DE'],
    ranking: 45,
    reviews: 2800000,
    downloads: 500000000,
    inAppPurchases: false,
    subscriptions: false,
    ageInDays: 4015 // ~11 years old
  }
};

export class AppDataService {
  
  /**
   * Get app data by ID with calculated metrics
   */
  async getAppById(id: string) {
    const app = mockApps[id.toLowerCase()];
    if (!app) return null;

    // Calculate metrics using our estimation engine
    const revenueEstimate = metricsCalculator.estimateRevenue(app);
    const downloadEstimate = metricsCalculator.estimateDownloads(app);
    const growthMetrics = metricsCalculator.calculateGrowthMetrics(app);

    return {
      ...app,
      estimates: {
        revenue: revenueEstimate,
        downloads: downloadEstimate,
        growth: growthMetrics
      },
      formattedMetrics: {
        estimatedRevenue: this.formatRevenue(revenueEstimate.monthlyRevenue),
        estimatedDownloads: this.formatDownloads(downloadEstimate.monthlyDownloads),
        dailyRevenue: this.formatRevenue(revenueEstimate.dailyRevenue),
        dailyDownloads: this.formatDownloads(downloadEstimate.dailyDownloads)
      }
    };
  }

  /**
   * Search apps by name
   */
  async searchApps(query: string, limit = 10) {
    const apps = Object.values(mockApps);
    const filtered = apps.filter(app => 
      app.name.toLowerCase().includes(query.toLowerCase()) ||
      app.developer.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.slice(0, limit).map(app => ({
      id: app.id,
      name: app.name,
      developer: app.developer,
      category: app.category,
      icon: app.icon,
      rating: app.rating,
      ranking: app.ranking
    }));
  }

  /**
   * Get trending apps
   */
  async getTrendingApps(limit = 20) {
    const apps = Object.values(mockApps);
    
    // Sort by ranking (lower is better)
    const trending = apps
      .sort((a, b) => a.ranking - b.ranking)
      .slice(0, limit);

    return Promise.all(trending.map(async (app) => {
      const appWithMetrics = await this.getAppById(app.id);
      return {
        ...app,
        estimates: appWithMetrics?.estimates,
        formattedMetrics: appWithMetrics?.formattedMetrics,
        trend: this.simulateTrend(),
        trendPercentage: this.simulateTrendPercentage()
      };
    }));
  }

  /**
   * Get apps by category
   */
  async getAppsByCategory(category: string, limit = 20) {
    const apps = Object.values(mockApps);
    const filtered = apps
      .filter(app => app.category === category)
      .slice(0, limit);

    return Promise.all(filtered.map(async (app) => {
      const appWithMetrics = await this.getAppById(app.id);
      return {
        ...app,
        estimates: appWithMetrics?.estimates,
        formattedMetrics: appWithMetrics?.formattedMetrics
      };
    }));
  }

  /**
   * Get all categories
   */
  async getCategories() {
    const apps = Object.values(mockApps);
    const categories = [...new Set(apps.map(app => app.category))];
    
    return categories.map(category => ({
      name: category,
      count: apps.filter(app => app.category === category).length,
      icon: this.getCategoryIcon(category)
    }));
  }

  private formatRevenue(amount: number): string {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(0)}`;
  }

  private formatDownloads(amount: number): string {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  }

  private simulateTrend(): 'up' | 'down' | 'neutral' {
    const rand = Math.random();
    if (rand > 0.6) return 'up';
    if (rand < 0.2) return 'down';
    return 'neutral';
  }

  private simulateTrendPercentage(): number {
    const trend = this.simulateTrend();
    if (trend === 'up') return Math.round((Math.random() * 150 + 10) * 10) / 10;
    if (trend === 'down') return -Math.round((Math.random() * 50 + 5) * 10) / 10;
    return Math.round((Math.random() * 10 - 5) * 10) / 10;
  }

  private getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'Photo & Video': '📷',
      'Entertainment': '🎬',
      'Music': '🎵',
      'Social': '👥',
      'Travel': '✈️',
      'Games': '🎮',
      'Productivity': '💼',
      'Finance': '💰',
      'Health & Fitness': '💪',
      'Education': '📚',
      'Shopping': '🛒'
    };
    
    return icons[category] || '📱';
  }
}

// Export singleton instance
export const appDataService = new AppDataService();