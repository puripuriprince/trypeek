# Deployment Guide for TryPeek.ai 🚀

This guide covers deploying TryPeek.ai to various platforms and environments.

## Quick Deploy Options

### Vercel (Recommended)
The easiest way to deploy TryPeek.ai is using Vercel:

1. **Connect Repository**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Deploy from GitHub
   # Push your code to GitHub, then connect at vercel.com
   ```

2. **One-Click Deploy**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/trypeek)

3. **Environment Variables**
   - No environment variables required for basic functionality
   - Add these for enhanced features:
   ```
   NEXTAUTH_SECRET=your-secret-key
   DATABASE_URL=your-database-connection
   OPENAI_API_KEY=your-openai-key (for AI features)
   ```

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

### Railway
1. Connect GitHub repository
2. Railway will auto-detect Next.js
3. Deploy with one click

## Manual Deployment

### Build for Production
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start production server
npm start
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

```bash
# Build and run Docker container
docker build -t trypeek .
docker run -p 3000:3000 trypeek
```

## Environment Configuration

### Development
```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production
```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://trypeek.ai
```

## Performance Optimization

### Next.js Configuration
```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static exports if needed
  output: 'export',
  
  // Image optimization
  images: {
    unoptimized: true, // For static export
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
```

### Build Optimization
```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to package.json
"analyze": "ANALYZE=true next build"

# Run analysis
npm run analyze
```

## Monitoring & Analytics

### Error Tracking
Add Sentry for error monitoring:
```bash
npm install @sentry/nextjs
```

### Analytics
Add analytics tracking:
```typescript
// Google Analytics, Mixpanel, or similar
// Add tracking code to _app.tsx or layout.tsx
```

### Performance Monitoring
- **Vercel Analytics** - Built-in performance monitoring
- **Web Vitals** - Core web vitals tracking
- **Lighthouse CI** - Automated performance testing

## Database Setup (Future)

### Recommended Stack
- **Database**: PostgreSQL or MongoDB
- **ORM**: Prisma or Mongoose
- **Hosting**: Railway, PlanetScale, or MongoDB Atlas

### Migration Example
```typescript
// prisma/schema.prisma
model App {
  id          String   @id @default(cuid())
  name        String
  developer   String
  category    String
  revenue     Float?
  downloads   Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Security Checklist

### Before Production
- [ ] Enable HTTPS/SSL
- [ ] Set up proper CORS policies
- [ ] Implement rate limiting
- [ ] Add CSP headers
- [ ] Enable security headers
- [ ] Remove debug information
- [ ] Validate all user inputs
- [ ] Set up authentication (if needed)

### Security Headers
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

## CDN & Caching

### Static Assets
- Images optimized with Next.js Image component
- Static files served from `/public` directory
- Automatic code splitting and lazy loading

### Caching Strategy
```typescript
// API routes with caching
export async function GET() {
  const data = await fetchData();
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    }
  });
}
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### Memory Issues
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### TypeScript Errors
```bash
# Type checking
npm run type-check

# Skip type checking during build (not recommended)
SKIP_TYPE_CHECK=true npm run build
```

## Scaling Considerations

### Horizontal Scaling
- Use load balancers (Nginx, Cloudflare)
- Deploy multiple instances
- Implement session storage (Redis)

### Database Scaling
- Connection pooling
- Read replicas
- Database indexing
- Caching layers (Redis, Memcached)

### Performance Monitoring
- Set up alerts for response times
- Monitor memory usage
- Track error rates
- Monitor database performance

## Backup & Recovery

### Automated Backups
```bash
# Database backups (example for PostgreSQL)
pg_dump $DATABASE_URL > backup.sql

# File system backups
tar -czf backup.tar.gz ./data
```

### Disaster Recovery Plan
1. Database restoration procedures
2. Application rollback strategy
3. DNS failover configuration
4. Communication plan for outages

---

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/yourusername/trypeek/issues)
- Join our [Discord](https://discord.gg/trypeek)
- Email: devops@trypeek.ai

---

**Happy Deploying! 🎉**