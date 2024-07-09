import { metaObject } from '@/config/site.config';
import AnalyticsPage from './analytics/page';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <AnalyticsPage />;
}
