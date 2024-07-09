'use client';

import CountUp from 'react-countup';
import cn from '@/utils/class-names';
import SimpleBar from 'simplebar-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { useEffect } from 'react';
import { dispatch } from '@/store';
import { getOverview } from '@/store/slices/statisticalSlice';

type JobStatsType = {
  className?: string;
};

const statData: StatType[] = [
  {
    label: 'Active Jobs',
    value: 15786,
  },
  {
    label: 'Published Jobs',
    value: 20129,
  },
  {
    label: 'Shortlisted',
    value: 8503,
  },
  {
    label: 'On Hold',
    value: 2430,
  },
];

export type StatType = {
  label: string;
  value: number;
  className?: string;
};

export type StatCardProps = {
  className?: string;
  transaction: StatType;
};

function StatCard({ className, transaction }: StatCardProps) {
  const { label, value } = transaction;
  return (
    <div className={cn('w-full rounded-lg border border-gray-300 p-5', className)}>
      <div className="mb-4 flex items-start gap-5">
        <div>
          <p className="font-medium text-gray-500">{label}</p>
          <p className="text-[22px] font-bold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-3xl mt-2">
            <CountUp end={value} duration={5} /> $
          </p>
        </div>
      </div>
    </div>
  );
}

export default function JobStats({ className }: JobStatsType) {
  const { dataOverview } = useSelector((state: RootState) => state.statistical);

  useEffect(() => {
    dispatch(getOverview());
  }, []);
  return (
    <div className={className}>
      <SimpleBar>
        <div className="flex items-start gap-6">
          {dataOverview.map((stat: StatType, index: number) => {
            return <StatCard key={'stat-card-' + index} transaction={stat} className="w-full" />;
          })}
        </div>
      </SimpleBar>
    </div>
  );
}
