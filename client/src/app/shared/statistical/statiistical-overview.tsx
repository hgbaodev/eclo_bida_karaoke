'use client';

import { useEffect, useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart, ResponsiveContainer } from 'recharts';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import { Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';
import { formatNumber } from '@/utils/format-number';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { getStatTime, setSelectedStats } from '@/store/slices/statisticalSlice';
import { set } from 'lodash';

const dailyData = [
  {
    label: 'Sat',
    value: 9800,
  },
  {
    label: 'Sun',
    value: 8700,
  },
  {
    label: 'Mon',
    value: 5000,
  },
  {
    label: 'Tue',
    value: 4500,
  },
  {
    label: 'Wed',
    value: 2500,
  },
  {
    label: 'Thu',
    value: 8000,
  },
  {
    label: 'Fri',
    value: 8700,
  },
];

const monthlyData = [
  {
    label: 'Jan',
    value: 100,
  },
  {
    label: 'Feb',
    value: 1890,
  },
  {
    label: 'Mar',
    value: 4300,
  },
  {
    label: 'Apr',
    value: 5710,
  },
  {
    label: 'May',
    value: 5710,
  },
  {
    label: 'Jun',
    value: 5710,
  },
  {
    label: 'Jan',
    value: 5650,
  },
  {
    label: 'Feb',
    value: 1890,
  },
  {
    label: 'Mar',
    value: 4300,
  },
  {
    label: 'Apr',
    value: 5710,
  },
  {
    label: 'May',
    value: 5710,
  },
  {
    label: 'Jun',
    value: 5710,
  },
  {
    label: 'Jan',
    value: 5650,
  },
  {
    label: 'Feb',
    value: 1890,
  },
  {
    label: 'Mar',
    value: 4300,
  },
  {
    label: 'Apr',
    value: 5710,
  },
  {
    label: 'May',
    value: 5710,
  },
  {
    label: 'Jun',
    value: 10000,
  },
];

const COLORS = ['#3962F7'];

const viewOptions = [
  {
    label: 'Weekly',
    value: 'week',
  },
  {
    label: 'Monthly',
    value: 'month',
  },
];

export default function JobOverview({ className }: { className?: string }) {
  const { dataStats, selectedStats } = useSelector((state: RootState) => state.statistical);
  const [data, setData] = useState(dailyData);
  const isTab = useMedia('(max-width: 768px)', false);

  useEffect(() => {
    dispatch(getStatTime(selectedStats));
  }, [selectedStats]);

  function handleChange(viewType: string) {
    dispatch(setSelectedStats(viewType));
  }

  return (
    <WidgetCard
      title="Order Overview"
      className={cn('min-h-[28rem]', className)}
      titleClassName="font-normal text-sm sm:text-sm text-gray-500 mb-2.5 font-inter"
      action={
        <div className="flex items-center gap-5">
          <DropdownAction
            className="rounded-md border"
            options={viewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </div>
      }
    >
      <SimpleBar>
        <div className="h-[20rem] w-full pt-6 @lg:pt-8 lg:h-[24rem] 3xl:h-[25rem]">
          <ResponsiveContainer width="100%" height="100%" {...(isTab && { minWidth: '1100px' })}>
            <ComposedChart
              data={dataStats}
              margin={{
                left: -6,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <CartesianGrid vertical={false} strokeOpacity={0.435} strokeDasharray="8 10" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={({ payload, ...rest }) => {
                  const pl = {
                    ...payload,
                    value: formatNumber(Number(payload.value)),
                  };
                  return <CustomYAxisTick prefix={'$'} payload={pl} {...rest} />;
                }}
              />
              <Tooltip content={<CustomTooltip formattedNumber />} />

              <defs>
                <linearGradient id="value" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
                  <stop offset="1" stopColor="#3962F7" />
                </linearGradient>
              </defs>
              <Bar dataKey="value" fill="url(#value)" stroke={COLORS[0]} barSize={28} radius={[4, 4, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
