'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { CreateWorkShiftInput, createWorkShiftSchema } from '@/utils/validators/work-shift/create-work-shift';
import {
  createShiftUserDetail,
  createShiftUserDetailByWorkShift,
  setWorkShift,
} from '@/store/slices/shift_user_detailSlice';
import { createWorkShift, getAllWorkShifts } from '@/store/slices/workshiftSlice';
import { createAttendance, createAttendanceByWS } from '@/store/slices/attendanceSlice';

export default function CreateWorkShift() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { listShiftUserDetail } = useSelector((state: RootState) => state.shift_user_detail);
  const { isCreateLoading, oneWorkShift } = useSelector((state: RootState) => state.work_shift);

  const onSubmit: SubmitHandler<CreateWorkShiftInput> = async (data) => {
    const result: any = await dispatch(createWorkShift(data));
    if (createWorkShift.fulfilled.match(result)) {
      const workshift = result.payload.data;
      const updatedList = listShiftUserDetail.map((item) => {
        const shiftUserDetail: ShiftUserDetail = {
          day_of_week: item.day_of_week,
          shift: item.shift.active,
          staff: item.staff.active,
          workshift: workshift.active,
        };
        return shiftUserDetail;
      });
      const attendance: Detail[] = [];
      await dispatch(createShiftUserDetailByWorkShift({ detail: updatedList }));
      for (const item of updatedList) {
        const days = getDaysOfWeekByName(workshift.date_start, workshift.date_end, item.day_of_week);
        days.map((day) => {
          const formattedDate = `${day.getFullYear()}-${('0' + (day.getMonth() + 1)).slice(-2)}-${(
            '0' + day.getDate()
          ).slice(-2)}`;
          const detail: Detail = {
            staff: item.staff,
            day: formattedDate,
            shift: item.shift,
          };
          attendance.push(detail);
        });
      }
      dispatch(createAttendanceByWS({ detail: attendance }));
      setReset({});
      setErrors({});
      closeModal();
      await dispatch(getAllWorkShifts());
      dispatch(setWorkShift(workshift.active));
      toast.success('Work Shift created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form<CreateWorkShiftInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createWorkShiftSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Copy Work Shift
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Work Shift"
              className="col-span-full"
              readOnly
              value={oneWorkShift.date_start + '->' + oneWorkShift.date_end}
            />
            <Input
              type="date"
              label="Date Start"
              className="col-span-full"
              {...register('date_start')}
              error={errors.date_start?.message}
            />
            <Input
              type="date"
              label="Date End"
              className="col-span-full"
              {...register('date_end')}
              error={errors.date_end?.message}
            />

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Copy Work Shift
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
export interface ShiftUserDetail {
  day_of_week: string;
  shift: string;
  staff: string;
  workshift: string;
}
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
export interface Detail {
  staff: string;
  day: string;
  shift: string;
}
