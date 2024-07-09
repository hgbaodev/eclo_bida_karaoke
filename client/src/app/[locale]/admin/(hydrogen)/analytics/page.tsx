import AnalyticsDashboard from '@/app/[locale]/shared/analytics-dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Analytics'),
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
