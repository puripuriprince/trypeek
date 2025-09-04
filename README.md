# TryPeek.ai 📱💰

A SensorTower-style platform for tracking app market intelligence, revenue estimates, and growth metrics. Built for indie developers, small studios, and SaaS founders who need app analytics without enterprise pricing.

![TryPeek Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=TryPeek.ai+Demo)

## ✨ Features

### 🎯 Core Functionality
- **App Search & Discovery** - Find and analyze any app across iOS and Android
- **Revenue Estimation** - Sophisticated MRR/ARR calculations using proprietary algorithms
- **Download Analytics** - Estimate daily, monthly, and yearly download volumes
- **Growth Metrics** - Track trends, growth rates, and competitive positioning
- **Real-time Data** - Updated analytics and market intelligence

### 📊 Analytics Dashboard
- Interactive revenue and download charts
- Trend analysis with growth percentages
- Competitive intelligence and market positioning
- Category-based insights and comparisons
- Export capabilities (CSV/JSON)

### 🏢 Business Model
- **Freemium Tier** - 10 app lookups per month, basic metrics
- **Pro Tier ($29/month)** - Unlimited lookups, advanced analytics, API access
- **Enterprise** - Custom integrations, dedicated support, SLA guarantees

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trypeek.git
   cd trypeek
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Apps Available
Try searching for these apps to see the platform in action:
- `instagram` - Social media platform analytics
- `tiktok` - Short-form video app metrics  
- `spotify` - Music streaming service data
- `netflix` - Entertainment platform insights
- `whatsapp` - Messaging app analytics
- `uber` - Rideshare service metrics

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── app/[id]/          # Dynamic app detail pages
│   ├── categories/        # Categories overview
│   ├── trending/          # Trending apps page
│   ├── pricing/           # Pricing page
│   └── page.tsx          # Homepage
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation
│   ├── Hero.tsx          # Homepage hero section
│   ├── SearchBar.tsx     # App search functionality
│   ├── TrendingApps.tsx  # Trending apps display
│   ├── AppHeader.tsx     # App detail header
│   ├── AppMetrics.tsx    # Metrics display
│   ├── RevenueChart.tsx  # Revenue visualization
│   └── DownloadChart.tsx # Download visualization
└── lib/                  # Core business logic
    ├── metrics-calculator.ts  # Revenue/download estimation engine
    └── app-data.ts           # Data service layer
```

## 🧮 Revenue Estimation Algorithm

Our proprietary algorithm estimates app revenue using multiple factors:

### Data Points Analyzed
- **App Store Rankings** - Position in category and overall charts
- **Review Velocity** - Rate of new reviews and ratings
- **Category Multipliers** - Industry-specific revenue patterns
- **Platform Factors** - iOS vs Android monetization differences
- **Monetization Model** - Paid, freemium, subscription, or ad-supported
- **Geographic Distribution** - Market presence across countries

### Calculation Methodology
```typescript
Revenue = BaseRevenue × CategoryMultiplier × PlatformMultiplier × RankingMultiplier × RatingMultiplier
```

#### Confidence Levels
- **High (90-95% accuracy)** - Apps with 10K+ reviews, top 100 ranking, multi-platform
- **Medium (80-90% accuracy)** - Apps with 1K+ reviews, top 1000 ranking
- **Low (60-80% accuracy)** - Limited data, new apps, niche categories

## 🎨 Design System

### Color Palette
- **Primary**: Blue 600 (#2563EB) to Indigo 600 (#4F46E5)
- **Success**: Green 600 (#059669)
- **Warning**: Orange 600 (#EA580C)
- **Error**: Red 600 (#DC2626)
- **Neutral**: Slate 50-900 range

### Components
Built with Tailwind CSS for consistent styling and responsive design.

## 🔧 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **React 19** - Latest React features

### Data & Analytics
- **Custom Algorithms** - Proprietary revenue estimation
- **Mock Data Service** - Simulated app store data
- **Real-time Updates** - Live trend calculations

## 📈 Key Differentiators

### vs SensorTower
- **Pricing**: Free tier + affordable pro plans vs enterprise-only
- **User Experience**: Simple, fast interface vs complex enterprise UI  
- **Target Audience**: Indie developers vs large enterprises
- **Open Source**: Transparent algorithms vs black box

### vs App Annie/Data.ai
- **Cost**: $29/month vs $1000s/month
- **Complexity**: Streamlined features vs feature bloat
- **Speed**: Fast load times vs heavy dashboards
- **Accessibility**: Self-serve vs sales-driven

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests: `npm run lint` and `npm run build`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards
- TypeScript for all new code
- ESLint + Prettier for formatting
- Responsive design principles
- Component-based architecture

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **GitHub Issues**: [Report bugs](https://github.com/yourusername/trypeek/issues)
- **Discussions**: [Join conversations](https://github.com/yourusername/trypeek/discussions)
- **Email**: support@trypeek.ai

---

<div align="center">

**Built with ❤️ for the indie developer community**

</div>
