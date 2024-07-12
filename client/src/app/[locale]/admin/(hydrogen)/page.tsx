import { metaObject } from '@/config/site.config';
import JobDashboard from '../../shared/job-dashboard';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <JobDashboard />;
}
