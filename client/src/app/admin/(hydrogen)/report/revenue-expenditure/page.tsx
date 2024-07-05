import Statistical from '@/app/shared/statistical';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Statistical'),
};

export default function JobBoardPage() {
  return <Statistical />;
}
