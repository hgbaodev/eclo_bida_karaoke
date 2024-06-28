'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';
interface MonthYear {
  month: number;
  year: number;
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
function getFirstAndLastDayOfMonth(month: number, year: number): { startDate: Date; endDate: Date } {
  const startDate = new Date(year, month - 1, 1); // Để ý là month - 1 vì month trong Date bắt đầu từ 0 (0 = tháng 1, 1 = tháng 2, ..., 11 = tháng 12)
  const endDate = new Date(year, month, 0);

  return { startDate, endDate };
}
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
// Ví dụ lấy ngày đầu tháng và ngày cuối tháng cho tháng 6 năm 2024
export const getColumns = (openModal: (args: any) => void, Data: Attendance[], month: number, year: number) => {
  const { startDate, endDate } = getFirstAndLastDayOfMonth(month, year);
  const dates = getDatesBetween(startDate, endDate);
  const columns = [
    {
      title: <HeaderCell title="Staff/Day" />,
      dataIndex: 'shift',
      key: 'shift',
      width: 50,
      render: (_: string, staff: Staff) => staff.last_name + ' ' + staff.first_name,
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
        const dataForDate = Data.filter((item) => item.day === formatDate(date) && item.staff.active === staff.active);
        if (dataForDate.length > 0) {
          // Đưa ra logic để xử lý dữ liệu
          return (
            <div>
              {/* Ví dụ: hiển thị các thông tin từ dữ liệu */}
              {dataForDate.map((item) => (
                <div key={item.active}>
                  {/* Hiển thị thông tin của item */}
                  <p>{item.time_in}</p>
                  <p>{item.time_out}</p>
                </div>
              ))}
            </div>
          );
        } else {
          // Nếu không có dữ liệu, hiển thị "OFF" hoặc thông báo khác
          return <div>OFF</div>;
        }
      },
    })),
  ];

  return columns;
};

export interface Attendance {
  day: string;
  staff: {
    name: string;
    active: string;
  };
  time_in: string;
  time_out: string;
  active: string;
}
export interface Staff {
  active: string;
  first_name: string;
  last_name: string;
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
