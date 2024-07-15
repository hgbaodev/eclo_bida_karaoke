import { metaObject } from '@/config/site.config';
import Statistical from '../../shared/statistical';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <Statistical />;
}
