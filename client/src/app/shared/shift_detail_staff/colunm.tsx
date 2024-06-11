'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';
import CreateShiftDetailStaff from './create-shift_detail_staff';
import Create from '@/components/select/Create';
import DayColumn from '@/components/select/ShiftUser';
import { deleteShiftUserDetail, getAllShiftUserDetails } from '@/store/slices/shift_user_detail';
import { dispatch } from '@/store';
import DeletePopover from '../delete-popover';
import toast from 'react-hot-toast';
export const getColumns = (openModal: (args: any) => void, Data: ShiftUserDetail[]) => [
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
    width: 200,
    render: (_: string, shift: Shift) => {
      // Lọc ra tất cả các dữ liệu có day_of_week là "Monday"
      const mondayDataList = Data.filter((item) => {
        return item.day_of_week === 'Monday' && item.shift.active === shift.active;
      });

      // Kiểm tra xem có dữ liệu cho "Monday" không
      if (mondayDataList.length > 0) {
        // Trả về thông tin mong muốn từ mondayDataList
        return (
          <div>
            {/* Hiển thị thông tin từ mondayDataList */}
            {mondayDataList.map((mondayData, index) => (
              <div key={index}>
                {mondayData.staff.name}
                <DeletePopover
                  title={`Delete this staff`}
                  description={`Are you sure you want to delete this #${mondayData.staff.name} staff?`}
                  onDelete={async () => {
                    const result = await dispatch(deleteShiftUserDetail(mondayData.active)); // Remove the .then() block
                    if (deleteShiftUserDetail.fulfilled.match(result)) {
                      await dispatch(getAllShiftUserDetails());
                      toast.success(`Staff #${mondayData.staff.name} has been deleted successfully.`);
                    } else {
                      toast.error(`Failed to delete staff #${mondayData.staff.name}.`);
                    }
                  }}
                />
                <br />
              </div>
            ))}
            <Create
              onClick={<CreateShiftDetailStaff day_of_week="Monday" shift={shift.time_in + '-' + shift.time_out} />}
            />
          </div>
        );
      } else {
        // Nếu không có dữ liệu, trả về một giá trị mặc định hoặc null
        return (
          <div>
            <Create
              onClick={<CreateShiftDetailStaff day_of_week="Monday" shift={shift.time_in + '-' + shift.time_out} />}
            />
          </div>
        );
      }
    },
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
    width: 200,
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
    width: 200,
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
    width: 200,
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
    width: 200,
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
