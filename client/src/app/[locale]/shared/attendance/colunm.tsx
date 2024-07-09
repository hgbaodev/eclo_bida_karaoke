'use client';
import React from 'react';
import { HeaderCell } from '@/components/ui/table';
import {  Text, Badge,ActionIcon, Tooltip } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EditAttendance from './edit-attendance';
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
const now = new Date();
const Year = now.getFullYear();
const Month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const currentDate = `${Year}-${Month}-${day}`;
// Ví dụ lấy ngày đầu tháng và ngày cuối tháng cho tháng 6 năm 2024
export  function getStatusBadge(status: DayOff['status']) {
  switch (status) {
    case STATUSES.Unapproved:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Unapproved</Text>
        </div>
      );
    case STATUSES.Approved:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Approved</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}
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
          return (
            <div>
              {dataForDate.map((item) => (
                <div key={item.active}>
                  <p>{item.check_in}</p>
                  <p>{item.check_out}</p>
                  {item.check_in && (
                    <Tooltip size="sm" content={'Edit Attendance'} placement="top" color="invert">
                      <ActionIcon
                        onClick={() => {
                          const data = {
                            time: '',
                            uuid: staff.uuid,
                            day: '',
                            check_in: item.check_in,
                            check_out: item.check_out,
                          };
                          openModal({
                            view: <EditAttendance attendance={data} currentDate={currentDate} />,
                          });
                        }}
                        as="span"
                        size="sm"
                        variant="outline"
                        className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </div>
              ))}
            </div>
          );
        } else {
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
  check_in: string;
  check_out: string;
  active: string;
}
export interface Staff {
  active: string;
  first_name: string;
  last_name: string;
  phone: string;
  image: string;
  uuid: string;
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
export interface DayOff{
  active:string;
  day_off:string;
  staff_id:string;
  status: string;
}
export const STATUSES = {
  Approved: 'A',
  Unapproved: 'D',
} as const; 



