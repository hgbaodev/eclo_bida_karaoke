import JobDashboard from '@/app/[locale]/shared/job-dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Job Board'),
};

export default function JobBoardPage() {
  return <JobDashboard />;
}
