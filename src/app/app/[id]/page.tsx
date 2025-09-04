import { Navigation } from '@/components/Navigation';
import { AppMetrics } from '@/components/AppMetrics';
import { AppHeader } from '@/components/AppHeader';
import { RevenueChart } from '@/components/RevenueChart';
import { DownloadChart } from '@/components/DownloadChart';
import { appDataService } from '@/lib/app-data';
import { notFound } from 'next/navigation';

interface AppPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AppPage({ params }: AppPageProps) {
  const { id } = await params;
  const app = await appDataService.getAppById(id);
  
  if (!app) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <AppHeader app={app} />
        <div className="mt-8 grid gap-8">
          <AppMetrics app={app} />
          <div className="grid lg:grid-cols-2 gap-8">
            <RevenueChart appId={id} />
            <DownloadChart appId={id} />
          </div>
        </div>
      </main>
    </div>
  );
}