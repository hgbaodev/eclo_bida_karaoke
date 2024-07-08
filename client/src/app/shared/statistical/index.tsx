import JobOverview from './statiistical-overview';
import JobStats from './statistical-stats';

export default function Statistical() {
  return (
    <div className="grid grid-cols-12 gap-6 @container @[59rem]:gap-7">
      <JobStats className="col-span-full" />
      <div className="col-span-full @[90rem]:col-span-8">
        <JobOverview />
      </div>
    </div>
  );
}
