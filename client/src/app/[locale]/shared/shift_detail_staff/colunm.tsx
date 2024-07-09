'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';
import DayColumn from '@/components/select/ShiftUser';

export const getColumns = (openModal: (args: any) => void, Data: ShiftUserDetail[], workshift: any) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const columns = [
    {
      title: <HeaderCell title="Shift/Day" />,
      dataIndex: 'shift',
      key: 'shift',
      width: 30,
      render: (_: string, shift: Shift) => {
        if (shift.shift_type == 'P') {
          return 'PartTime: ' + `${shift.time_in}-${shift.time_out}`;
        } else if (shift.shift_type == 'F') {
          return 'FullTime: ' + `${shift.time_in}-${shift.time_out}`;
        }
      },
    },
    ...daysOfWeek.map((day) => ({
      title: <HeaderCell title={day.substring(0, 3)} />,
      dataIndex: day.toLowerCase(),
      key: day.toLowerCase(),
      width: 200,
      render: (_: string, shift: Shift) => (
        <DayColumn data={Data} dayOfWeek={day} shift={shift} workshift={workshift} />
      ),
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
    first_name: string;
    last_name: string;
    active: string;
    uuid: string;
  };
  active: string;
}
