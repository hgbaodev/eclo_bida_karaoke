'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';
import DayColumn from '@/components/select/ShiftUser';
type Language = 'en' | 'vi';
export const getColumns = (openModal: (args: any) => void, Data: ShiftUserDetail[], workshift: any, t: any) => {
  const daysOfWeek = {
    en: [
      { key: 'Monday', value: 'Monday' },
      { key: 'Tuesday', value: 'Tuesday' },
      { key: 'Wednesday', value: 'Wednesday' },
      { key: 'Thursday', value: 'Thursday' },
      { key: 'Friday', value: 'Friday' },
      { key: 'Saturday', value: 'Saturday' },
      { key: 'Sunday', value: 'Sunday' },
    ],
    vi: [
      { key: 'T2', value: 'Monday' },
      { key: 'T3', value: 'Tuesday' },
      { key: 'T4', value: 'Wednesday' },
      { key: 'T5', value: 'Thursday' },
      { key: 'T6', value: 'Friday' },
      { key: 'T7', value: 'Saturday' },
      { key: 'CN', value: 'Sunday' },
    ],
  };
  let lang: Language = 'en';
  if (t('table_day') == 'vi') {
    lang = 'vi';
  }
  const columns = [
    {
      title: <HeaderCell title={t('table_day_shift')} />,
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
    ...daysOfWeek[lang].map((day) => ({
      title: <HeaderCell title={day.key.substring(0, 3)} />,
      dataIndex: day.key.toLowerCase(),
      key: day.key.toLowerCase(),
      width: 200,
      render: (_: string, shift: Shift) => (
        <DayColumn data={Data} dayOfWeek={day.value} shift={shift} workshift={workshift} t={t} />
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
