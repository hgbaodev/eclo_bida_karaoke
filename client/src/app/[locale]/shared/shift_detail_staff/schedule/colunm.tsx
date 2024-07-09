'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';
import { render } from 'node_modules/@headlessui/react/dist/utils/render';
export const getColumns = (openModal: (args: any) => void, Data: ShiftUserDetail[], work_shift: any) => {
  if (!work_shift || !work_shift.date_start || !work_shift.date_end) {
    return [];
  }
  const startDate = new Date(work_shift.date_start);
  const endDate = new Date(work_shift.date_end);
  const dates = getDatesBetween(startDate, endDate);
  const columns = [
    {
      title: <HeaderCell title="Shift/Day" />,
      dataIndex: 'shift',
      key: 'shift',
      width: 30,
      render: (_: any) => {
        return <div className="schedule-time"></div>;
      },
    },
    ...dates.map((date) => ({
      title: (
        <HeaderCell
          title={date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          })}
        />
      ),
      dataIndex: date.toLocaleDateString('en-US', { weekday: 'short' }),
      key: date.toLocaleDateString('en-US', { weekday: 'short' }),
      width: 200,
      render: (_: any) => {
        // Find the corresponding data for the current day_of_week
        const dataForDate = Data.find(
          (item) => item.day_of_week === date.toLocaleDateString('en-US', { weekday: 'long' }),
        );

        if (dataForDate) {
          return (
            <div className="schedule-time">
              <div>{dataForDate.shift.time_in}</div>
              <div>{dataForDate.shift.time_out}</div>
            </div>
          );
        } else {
          return <div className="schedule-time">OFF</div>;
        }
      },
    })),
  ];

  return columns;
};
const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
export interface Shift {
  time_in: string;
  time_out: string;
  active: string;
}
export interface WorkShift {
  date_start: string;
  date_end: string;
  active: string;
}
export interface ShiftUserDetail {
  day_of_week: string;
  shift: {
    active: string;
    time_in: string;
    time_out: string;
  };
  staff: {
    name: string;
    active: string;
  };
  workshift: {
    date_start: string;
    date_end: string;
    active: string;
  };
  active: string;
}
