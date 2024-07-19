// Tạo một component riêng để xử lý hiển thị dữ liệu của một ngày cụ thể
import { Shift, ShiftUserDetail, WorkShift } from '@/app/[locale]/shared/shift_detail_staff/colunm';
import CreateShiftDetailStaff from '@/app/[locale]/shared/shift_detail_staff/create-shift_detail_staff';
import React from 'react';
import Create from './Create';
import toast from 'react-hot-toast';
import { TiDeleteOutline } from 'react-icons/ti';
import { deleteShiftUserDetail, getShiftUserDetails } from '@/store/slices/shift_user_detailSlice';
import { dispatch } from '@/store';
import { ActionIcon, Tooltip } from 'rizzui';
import { deleteAttendance } from '@/store/slices/attendanceSlice';
import WithPermission from '@/guards/with-permisson';
interface DayColumnProps {
  data: ShiftUserDetail[];
  dayOfWeek: string;
  shift: Shift;
  workshift: any;
  t: any;
}

const DayColumn: React.FC<DayColumnProps> = ({ data, dayOfWeek, shift, workshift, t }) => {
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
            <WithPermission permission="shiftdetail.Delete">
              <Tooltip size="sm" content={t('delete')} placement="top" color="invert">
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
                        const days = getDaysOfWeekByName(workshift.date_start, workshift.date_end, dayOfWeek);
                        days.map((day) => {
                          const formattedDate = `${day.getFullYear()}-${('0' + (day.getMonth() + 1)).slice(-2)}-${(
                            '0' + day.getDate()
                          ).slice(-2)}`;
                          dispatch(deleteAttendance({ uuid: dayData.staff.uuid, day: formattedDate }));
                        });
                        await dispatch(getShiftUserDetails(workshift.active));
                        toast.success(t('delete_success'));
                      } else {
                        toast.error(`Failed to delete staff.`);
                      }
                    }}
                  />
                </ActionIcon>
              </Tooltip>
            </WithPermission>
            {dayData.staff.last_name + ' ' + dayData.staff.first_name} <br />
          </div>
        ))}
        <WithPermission permission="shiftdetail.Create">
          <Create onClick={<CreateShiftDetailStaff day_of_week={dayOfWeek} shift={shift} />} t={t} />
        </WithPermission>
      </div>
    );
  } else {
    return (
      <div>
        <WithPermission permission="shiftdetail.Create">
          <Create onClick={<CreateShiftDetailStaff day_of_week={dayOfWeek} shift={shift} />} t={t} />
        </WithPermission>
      </div>
    );
  }
};
function getDaysOfWeekByName(startDate: Date, endDate: Date, dayOfWeek: string): Date[] {
  const days: Date[] = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  // Chuyển đổi tên ngày trong tuần sang giá trị số
  const dayNameToIndex: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Lấy giá trị số của ngày trong tuần từ chuỗi tên
  const dayIndex = dayNameToIndex[dayOfWeek];

  // Lặp qua mỗi ngày trong khoảng thời gian
  while (currentDate <= end) {
    if (currentDate.getDay() === dayIndex) {
      days.push(new Date(currentDate));
    }
    // Tăng ngày hiện tại lên 1
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}
export default DayColumn;
