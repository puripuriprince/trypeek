interface AppStoreData {
  id: string;
  name: string;
  category: string;
  ranking: number;
  reviews: number;
  rating: number;
  downloads: number;
  price: number;
  inAppPurchases: boolean;
  subscriptions: boolean;
  ageInDays: number;
  platforms: ('iOS' | 'Android')[];
  countries: string[];
  lastUpdated: string;
}

interface RevenueEstimation {
  dailyRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  confidence: 'low' | 'medium' | 'high';
  methodology: string;
  breakdown: {
    ads: number;
    inAppPurchases: number;
    subscriptions: number;
    paidDownloads: number;
  };
}

interface DownloadEstimation {
  dailyDownloads: number;
  monthlyDownloads: number;
  yearlyDownloads: number;
  confidence: 'low' | 'medium' | 'high';
  methodology: string;
}

interface GrowthMetrics {
  downloadGrowthRate: number;
  revenueGrowthRate: number;
  userRetention: number;
  marketPenetration: number;
  competitivePosition: number;
}

export class MetricsCalculator {
  
  // Category-specific multipliers based on industry data
  private categoryMultipliers: Record<string, { revenue: number; downloads: number }> = {
    'Games': { revenue: 1.2, downloads: 1.5 },
    'Social': { revenue: 0.8, downloads: 2.0 },
    'Productivity': { revenue: 1.5, downloads: 0.8 },
    'Entertainment': { revenue: 1.0, downloads: 1.3 },
    'Finance': { revenue: 2.0, downloads: 0.6 },
    'Health & Fitness': { revenue: 1.1, downloads: 0.9 },
    'Education': { revenue: 0.7, downloads: 1.1 },
    'Shopping': { revenue: 1.3, downloads: 1.0 },
    'Photo & Video': { revenue: 0.9, downloads: 1.4 },
    'Music': { revenue: 1.6, downloads: 1.2 }
  };

  // Platform-specific factors
  private platformFactors = {
    iOS: { revenue: 1.4, downloads: 0.7 }, // iOS users spend more but fewer total users
    Android: { revenue: 0.6, downloads: 1.3 } // More users but lower ARPU
  };

  /**
   * Estimates app revenue based on multiple factors
   */
  estimateRevenue(appData: AppStoreData): RevenueEstimation {
    const baseRevenue = this.calculateBaseRevenue(appData);
    const categoryMultiplier = this.categoryMultipliers[appData.category]?.revenue || 1.0;
    const platformMultiplier = this.calculatePlatformMultiplier(appData.platforms, 'revenue');
    const rankingMultiplier = this.calculateRankingMultiplier(appData.ranking);
    const ratingMultiplier = this.calculateRatingMultiplier(appData.rating);
    
    const dailyRevenue = Math.round(
      baseRevenue * categoryMultiplier * platformMultiplier * rankingMultiplier * ratingMultiplier
    );

    // Calculate breakdown
    const breakdown = this.calculateRevenueBreakdown(appData, dailyRevenue);
    
    const confidence = this.calculateConfidence(appData);
    
    return {
      dailyRevenue,
      monthlyRevenue: dailyRevenue * 30,
      yearlyRevenue: dailyRevenue * 365,
      confidence,
      methodology: this.getRevenueMethodology(appData),
      breakdown
    };
  }

  /**
   * Estimates app downloads based on ranking, reviews, and other factors
   */
  estimateDownloads(appData: AppStoreData): DownloadEstimation {
    const baseDownloads = this.calculateBaseDownloads(appData);
    const categoryMultiplier = this.categoryMultipliers[appData.category]?.downloads || 1.0;
    const platformMultiplier = this.calculatePlatformMultiplier(appData.platforms, 'downloads');
    const rankingMultiplier = this.calculateDownloadRankingMultiplier(appData.ranking);
    const viralityMultiplier = this.calculateViralityMultiplier(appData);
    
    const dailyDownloads = Math.round(
      baseDownloads * categoryMultiplier * platformMultiplier * rankingMultiplier * viralityMultiplier
    );

    const confidence = this.calculateConfidence(appData);
    
    return {
      dailyDownloads,
      monthlyDownloads: dailyDownloads * 30,
      yearlyDownloads: dailyDownloads * 365,
      confidence,
      methodology: this.getDownloadMethodology(appData)
    };
  }

  /**
   * Calculates growth metrics and trends
   */
  calculateGrowthMetrics(appData: AppStoreData, historicalData?: unknown[]): GrowthMetrics {
    // Simulate growth calculations - in real app would use historical data
    const ageWeight = Math.min(appData.ageInDays / 365, 3); // Max 3 years weight
    const reviewVelocity = appData.reviews / Math.max(appData.ageInDays, 1);
    
    return {
      downloadGrowthRate: this.simulateGrowthRate(appData, 'downloads'),
      revenueGrowthRate: this.simulateGrowthRate(appData, 'revenue'),
      userRetention: this.estimateRetention(appData),
      marketPenetration: this.calculateMarketPenetration(appData),
      competitivePosition: this.calculateCompetitivePosition(appData)
    };
  }

  private calculateBaseRevenue(appData: AppStoreData): number {
    if (appData.price > 0) {
      // Paid app
      return appData.downloads * appData.price * 0.7; // Apple/Google take 30%
    }

    // Free app revenue estimation
    let baseRevenue = 0;
    
    if (appData.inAppPurchases) {
      baseRevenue += appData.downloads * 0.05 * 2.99; // 5% conversion, avg $2.99
    }
    
    if (appData.subscriptions) {
      baseRevenue += appData.downloads * 0.02 * 9.99; // 2% conversion, avg $9.99/month
    }
    
    // Ad revenue (for free apps)
    if (appData.price === 0) {
      baseRevenue += appData.downloads * 0.001; // $0.001 per daily active user (estimated)
    }

    return Math.max(baseRevenue, 0);
  }

  private calculateBaseDownloads(appData: AppStoreData): number {
    // Base estimation using reviews-to-downloads ratio
    // Industry average: 1 review per 100-500 downloads depending on category
    const reviewToDownloadRatio = this.getReviewToDownloadRatio(appData.category);
    const estimatedTotalDownloads = appData.reviews * reviewToDownloadRatio;
    
    // Convert to daily downloads based on app age
    const dailyDownloads = estimatedTotalDownloads / Math.max(appData.ageInDays, 1);
    
    return Math.max(dailyDownloads, 10); // Minimum 10 downloads per day
  }

  private getReviewToDownloadRatio(category: string): number {
    const ratios: Record<string, number> = {
      'Games': 200,
      'Social': 150,
      'Productivity': 300,
      'Entertainment': 250,
      'Finance': 400,
      'Health & Fitness': 350,
      'Education': 300,
      'Shopping': 180,
      'Photo & Video': 220,
      'Music': 160
    };
    
    return ratios[category] || 250;
  }

  private calculatePlatformMultiplier(platforms: ('iOS' | 'Android')[], metric: 'revenue' | 'downloads'): number {
    if (platforms.length === 1) {
      return this.platformFactors[platforms[0]][metric];
    }
    
    // Average if available on both platforms
    const iosMultiplier = this.platformFactors.iOS[metric];
    const androidMultiplier = this.platformFactors.Android[metric];
    
    return (iosMultiplier + androidMultiplier) / 2;
  }

  private calculateRankingMultiplier(ranking: number): number {
    if (ranking <= 10) return 3.0;
    if (ranking <= 50) return 2.0;
    if (ranking <= 100) return 1.5;
    if (ranking <= 500) return 1.2;
    if (ranking <= 1000) return 1.0;
    return 0.8;
  }

  private calculateDownloadRankingMultiplier(ranking: number): number {
    if (ranking <= 5) return 10.0;
    if (ranking <= 10) return 5.0;
    if (ranking <= 25) return 3.0;
    if (ranking <= 50) return 2.0;
    if (ranking <= 100) return 1.5;
    if (ranking <= 500) return 1.2;
    return 1.0;
  }

  private calculateRatingMultiplier(rating: number): number {
    if (rating >= 4.5) return 1.3;
    if (rating >= 4.0) return 1.1;
    if (rating >= 3.5) return 1.0;
    if (rating >= 3.0) return 0.8;
    return 0.6;
  }

  private calculateViralityMultiplier(appData: AppStoreData): number {
    const reviewRate = appData.reviews / Math.max(appData.ageInDays, 1);
    
    if (reviewRate > 100) return 2.0; // Very viral
    if (reviewRate > 50) return 1.5;  // Viral
    if (reviewRate > 10) return 1.2;  // Growing
    return 1.0; // Normal
  }

  private calculateRevenueBreakdown(appData: AppStoreData, totalRevenue: number) {
    const breakdown = { ads: 0, inAppPurchases: 0, subscriptions: 0, paidDownloads: 0 };

    if (appData.price > 0) {
      breakdown.paidDownloads = totalRevenue;
    } else {
      if (appData.subscriptions) {
        breakdown.subscriptions = totalRevenue * 0.6; // 60% from subscriptions
        breakdown.inAppPurchases = totalRevenue * 0.3; // 30% from IAP
        breakdown.ads = totalRevenue * 0.1; // 10% from ads
      } else if (appData.inAppPurchases) {
        breakdown.inAppPurchases = totalRevenue * 0.7; // 70% from IAP
        breakdown.ads = totalRevenue * 0.3; // 30% from ads
      } else {
        breakdown.ads = totalRevenue; // 100% from ads
      }
    }

    return breakdown;
  }

  private calculateConfidence(appData: AppStoreData): 'low' | 'medium' | 'high' {
    let score = 0;
    
    // More reviews = higher confidence
    if (appData.reviews > 10000) score += 2;
    else if (appData.reviews > 1000) score += 1;
    
    // Better ranking = higher confidence
    if (appData.ranking <= 100) score += 2;
    else if (appData.ranking <= 1000) score += 1;
    
    // Multiple platforms = higher confidence
    if (appData.platforms.length > 1) score += 1;
    
    // Age of app
    if (appData.ageInDays > 365) score += 1;
    
    if (score >= 5) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  }

  private getRevenueMethodology(appData: AppStoreData): string {
    return `Revenue estimated using proprietary algorithm based on app ranking (#${appData.ranking}), review count (${appData.reviews}), rating (${appData.rating}), category (${appData.category}), and monetization model.`;
  }

  private getDownloadMethodology(appData: AppStoreData): string {
    return `Downloads estimated using review-to-download ratio analysis, ranking position (#${appData.ranking}), app age (${appData.ageInDays} days), and category-specific conversion rates.`;
  }

  private simulateGrowthRate(appData: AppStoreData, _metric: 'downloads' | 'revenue'): number {
    // Simulate growth based on app characteristics
    const baseGrowth = Math.random() * 20 - 10; // ±10%
    const rankingBonus = appData.ranking <= 100 ? 15 : 0;
    const ratingBonus = appData.rating > 4.0 ? 10 : 0;
    
    return Math.round((baseGrowth + rankingBonus + ratingBonus) * 10) / 10;
  }

  private estimateRetention(appData: AppStoreData): number {
    // Estimate user retention based on category and rating
    let baseRetention = 0.25; // 25% base retention
    
    if (appData.category === 'Games') baseRetention = 0.15;
    if (appData.category === 'Social') baseRetention = 0.35;
    if (appData.category === 'Productivity') baseRetention = 0.45;
    if (appData.category === 'Finance') baseRetention = 0.60;
    
    // Rating impact
    const ratingMultiplier = Math.min(appData.rating / 4.5, 1.2);
    
    return Math.round(baseRetention * ratingMultiplier * 100) / 100;
  }

  private calculateMarketPenetration(appData: AppStoreData): number {
    // Simulate market penetration score (0-100)
    const rankingScore = Math.max(100 - appData.ranking / 10, 0);
    const reviewScore = Math.min(appData.reviews / 1000, 50);
    
    return Math.round(rankingScore + reviewScore);
  }

  private calculateCompetitivePosition(appData: AppStoreData): number {
    // Simulate competitive position score (0-100)
    const rankingScore = Math.max(100 - appData.ranking / 5, 0);
    const ratingScore = (appData.rating / 5) * 20;
    const reviewScore = Math.min(appData.reviews / 500, 20);
    
    return Math.round(rankingScore + ratingScore + reviewScore);
  }
}

// Export singleton instance
export const metricsCalculator = new MetricsCalculator();