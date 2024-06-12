'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';
import DayColumn from '@/components/select/ShiftUser';

export const getColumns = (openModal: (args: any) => void, Data: ShiftUserDetail[]) => [
  {
    title: <HeaderCell title="Shift/Day" />,
    dataIndex: 'shift',
    key: 'shift',
    width: 30,
    render: (_: string, shift: Shift) => shift.time_in + '-' + shift.time_out,
  },
  {
    title: <HeaderCell title="Mon" />,
    dataIndex: 'mon',
    key: 'mon',
    width: 200,
    render: (_: string, shift: Shift) => <DayColumn data={Data} dayOfWeek="Monday" shift={shift} />,
  },
  {
    title: <HeaderCell title="Tue" />,
    dataIndex: 'tue',
    key: 'tue',
    width: 200,
    render: (_: string, shift: Shift) => <DayColumn data={Data} dayOfWeek="Tuesday" shift={shift} />,
  },
  {
    title: <HeaderCell title="Wed" />,
    dataIndex: 'wed',
    key: 'wed',
    width: 200,
    render: (_: string, shift: Shift) => <DayColumn data={Data} dayOfWeek="Wednesday" shift={shift} />,
  },
  {
    title: <HeaderCell title="Thu" />,
    dataIndex: 'thu',
    key: 'thu',
    width: 200,
    render: (_: string, shift: Shift) => <DayColumn data={Data} dayOfWeek="Thursday" shift={shift} />,
  },
  {
    title: <HeaderCell title="Fri" />,
    dataIndex: 'fri',
    key: 'fri',
    width: 200,
    render: (_: string, shift: Shift) => <DayColumn data={Data} dayOfWeek="Friday" shift={shift} />,
  },
  {
    title: <HeaderCell title="Sat" />,
    dataIndex: 'sat',
    key: 'sat',
    width: 200,
    render: (_: string, shift: Shift) => <DayColumn data={Data} dayOfWeek="Saturday" shift={shift} />,
  },
  {
    title: <HeaderCell title="Sun" />,
    dataIndex: 'sun',
    key: 'sun',
    width: 200,
    render: (_: string, shift: Shift) => <DayColumn data={Data} dayOfWeek="Sunday" shift={shift} />,
  },
];

export interface Shift {
  time_in: string;
  time_out: string;
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
