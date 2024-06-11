// Tạo một component riêng để xử lý hiển thị dữ liệu của một ngày cụ thể
import { Shift, ShiftUserDetail } from '@/app/shared/shift_detail_staff/colunm';
import CreateShiftDetailStaff from '@/app/shared/shift_detail_staff/create-shift_detail_staff';
import React from 'react';
import Create from './Create';
interface DayColumnProps {
  data: ShiftUserDetail[];
  dayOfWeek: string;
  shift: Shift;
}

const DayColumn: React.FC<DayColumnProps> = ({ data, dayOfWeek, shift }) => {
  const dayDataList = data.filter((item) => {
    return item.day_of_week === dayOfWeek && item.shift.active === shift.active;
  });

  // Kiểm tra xem có dữ liệu cho ngày cụ thể không
  if (dayDataList.length > 0) {
    // Trả về thông tin mong muốn từ dayDataList
    return (
      <div>
        {dayDataList.map((dayData, index) => (
          <div key={index}>{dayData.staff.name}</div>
        ))}
        <Create
          onClick={<CreateShiftDetailStaff day_of_week={dayOfWeek} shift={shift.time_in + '-' + shift.time_out} />}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Create
          onClick={<CreateShiftDetailStaff day_of_week={dayOfWeek} shift={shift.time_in + '-' + shift.time_out} />}
        />
      </div>
    );
  }
};
export default DayColumn;
