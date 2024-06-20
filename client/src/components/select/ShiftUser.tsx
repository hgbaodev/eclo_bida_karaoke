// Tạo một component riêng để xử lý hiển thị dữ liệu của một ngày cụ thể
import { Shift, ShiftUserDetail, WorkShift } from '@/app/shared/shift_detail_staff/colunm';
import CreateShiftDetailStaff from '@/app/shared/shift_detail_staff/create-shift_detail_staff';
import React from 'react';
import Create from './Create';
import toast from 'react-hot-toast';
import { TiDeleteOutline } from 'react-icons/ti';
import { deleteShiftUserDetail, getShiftUserDetails } from '@/store/slices/shift_user_detailSlice';
import { dispatch } from '@/store';
import { ActionIcon, Tooltip } from 'rizzui';
interface DayColumnProps {
  data: ShiftUserDetail[];
  dayOfWeek: string;
  shift: Shift;
  workshift: any;
}

const DayColumn: React.FC<DayColumnProps> = ({ data, dayOfWeek, shift, workshift }) => {
  if (!data) {
    return null; // hoặc return hoặc hiển thị một thông báo lỗi
  }
  if (!workshift) {
    return null;
  }
  const dayDataList = data.filter((item) => {
    return item.day_of_week === dayOfWeek && item.shift.active === shift.active;
  });

  // Kiểm tra xem có dữ liệu cho ngày cụ thể không
  if (dayDataList.length > 0) {
    // Trả về thông tin mong muốn từ dayDataList
    return (
      <div>
        {dayDataList.map((dayData, index) => (
          <div
            key={index}
            className="flex items-center border border-gray-300 rounded-md mr-2"
            style={{ width: '150px' }}
          >
            <Tooltip size="sm" content={'Delete'} placement="top" color="invert">
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900  hover:text-gray-700 cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
              >
                <TiDeleteOutline
                  className="w-6 h-6"
                  onClick={async () => {
                    const result = await dispatch(deleteShiftUserDetail(dayData.active)); // Remove the .then() block
                    if (deleteShiftUserDetail.fulfilled.match(result)) {
                      await dispatch(getShiftUserDetails(workshift.active));
                      toast.success(`Staff #${dayData.staff.name} has been deleted successfully.`);
                    } else {
                      toast.error(`Failed to delete staff #${dayData.staff.name}.`);
                    }
                  }}
                />
              </ActionIcon>
            </Tooltip>
            {dayData.staff.name} <br />
          </div>
        ))}
        <Create onClick={<CreateShiftDetailStaff day_of_week={dayOfWeek} shift={shift} />} />
      </div>
    );
  } else {
    return (
      <div>
        <Create onClick={<CreateShiftDetailStaff day_of_week={dayOfWeek} shift={shift} />} />
      </div>
    );
  }
};
export default DayColumn;
