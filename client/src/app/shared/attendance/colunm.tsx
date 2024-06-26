'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';

export const getColumns = (openModal: (args: any) => void, Data: ShiftUserDetail[], work_shift: any) => {
  if (!work_shift || !work_shift.date_start || !work_shift.date_end) {
    return [];
  }
  const startDate = new Date(work_shift.date_start);
  const endDate = new Date(work_shift.date_end);
  const dates = getDatesBetween(startDate, endDate);
  const columns = [
    {
      title: <HeaderCell title="Staff/Day" />,
      dataIndex: 'shift',
      key: 'shift',
      width: 50,
      render: (_: string, staff: Staff) => staff.name,
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
      width: 100,
      render: (_: any, staff: Staff) => {
        const dataForDate = Data.find(
          (item) =>
            item.day_of_week === date.toLocaleDateString('en-US', { weekday: 'long' }) &&
            item.staff.active === staff.active,
        );

        if (dataForDate) {
          return <div></div>;
        } else {
          return <div>OFF</div>;
        }
      },
    })),
  ];

  return columns;
};

export interface Shift {
  time_in: string;
  time_out: string;
  active: string;
  shift_type: string;
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
  active: string;
}
const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
export interface Staff {
  active: string;
  name: string;
  phone: string;
  image: string;
  idcard: string;
  birthday: string;
  status: any;
  address: string;
  position: {
    name: string;
    active: string;
  };
  user: {
    active: string;
    email: string;
    password: string;
    role: string;
  } | null;
  created_at: string;
}
