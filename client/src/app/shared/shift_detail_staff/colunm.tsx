'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';
import CreateShiftDetailStaff from './create-shift_detail_staff';
import Create from '@/components/select/Create';
export const getColumns = (openModal: (args: any) => void) => [
  {
    title: <HeaderCell title="Shift/Day" />,
    dataIndex: 'shift',
    key: 'shift',
    width: 50,
    render: (_: string, shift: Shift) => shift.time_in + '-' + shift.time_out,
  },

  {
    title: <HeaderCell title="Mon" />,
    dataIndex: 'mon',
    key: 'mon',
    width: 100,
    render: (_: string, shift: Shift) => (
      <div>
        <Create
          onClick={<CreateShiftDetailStaff day_of_week="Monday" shift={shift.time_in + '-' + shift.time_out} />}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Tue" />,
    dataIndex: 'tue',
    key: 'tue',
    width: 100,
    render: (_: string, shift: Shift) => (
      <div>
        <Create
          onClick={<CreateShiftDetailStaff day_of_week="Tuesday" shift={shift.time_in + '-' + shift.time_out} />}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Wed" />,
    dataIndex: 'wed',
    key: 'wed',
    width: 100,
    render: (_: string, shift: Shift) => (
      <div>
        <Create
          onClick={<CreateShiftDetailStaff day_of_week="Wednesday" shift={shift.time_in + '-' + shift.time_out} />}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Thu" />,
    dataIndex: 'thu',
    key: 'thu',
    width: 100,
    render: (_: string, shift: Shift) => (
      <div>
        <Create
          onClick={<CreateShiftDetailStaff day_of_week="Thursday" shift={shift.time_in + '-' + shift.time_out} />}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Fri" />,
    dataIndex: 'fri',
    key: 'fri',
    width: 100,
    render: (_: string, shift: Shift) => (
      <div>
        <Create
          onClick={<CreateShiftDetailStaff day_of_week="Friday" shift={shift.time_in + '-' + shift.time_out} />}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Sat" />,
    dataIndex: 'sat',
    key: 'sat',
    width: 100,
    render: (_: string, shift: Shift) => (
      <div>
        <Create
          onClick={<CreateShiftDetailStaff day_of_week="Saturday" shift={shift.time_in + '-' + shift.time_out} />}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Sun" />,
    dataIndex: 'sun',
    key: 'sun',
    width: 100,
    render: (_: string, shift: Shift) => (
      <div>
        <Create
          onClick={<CreateShiftDetailStaff day_of_week="Sunday" shift={shift.time_in + '-' + shift.time_out} />}
        />
      </div>
    ),
  },
];

export interface Shift {
  time_in: string;
  time_out: string;
  active: string;
}
export interface ShiftDetail {
  shift_id: string;
}
export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
