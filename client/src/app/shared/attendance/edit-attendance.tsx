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
import { EditAttendanceInput, editAttendanceSchema } from '@/utils/validators/attendance/edit-attendance-schema';
import { getAttendances, updateAttendance } from '@/store/slices/attendanceSlice';

export default function EditAttendance({
  attendance,
  currentDate,
}: {
  attendance: EditAttendanceInput;
  currentDate: string;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(attendance);
  const [errors, setErrors] = useState<any>({});
  const {} = useSelector((state: RootState) => state.staff);
  const { month, year, isUpdateLoading } = useSelector((state: RootState) => state.attendance);
  const onSubmit: SubmitHandler<EditAttendanceInput> = async (data) => {
    console.log(data);
    const dataAttendance = {
      uuid: data.uuid,
      day: data.day,
      time: '',
      check_in: data.check_in,
      check_out: data.check_out,
      update: true,
    };
    const result: any = await dispatch(updateAttendance(dataAttendance));
    if (updateAttendance.fulfilled.match(result)) {
      setReset({});
      setErrors({});
      closeModal();
      toast.success('Updated successfully');
      dispatch(getAttendances({ month, year }));
    } else {
      setErrors(result?.payload?.errors);
      toast.error(result.payload.errors);
      closeModal();
    }
  };
  const handleClearCheckIn = () => {
    // Xóa giá trị check_in
    setReset({ ...reset, check_in: null });
  };

  const handleClearCheckOut = () => {
    // Xóa giá trị check_out
    setReset({ ...reset, check_out: null });
  };
  return (
    <Form<EditAttendanceInput>
      resetValues={{ time: '', ...reset, day: currentDate }}
      onSubmit={onSubmit}
      validationSchema={editAttendanceSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Edit Attendance
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Staff UUID"
              placeholder="Enter staff uuid"
              className="col-span-full"
              {...register('uuid')}
              readOnly
            />
            <Input type="date" label="Date" className="col-span-full" value={currentDate} readOnly />
            <Input
              type="time"
              label="Check in"
              className="col-span-[1/2]"
              {...register('check_in')}
              error={errors.check_in?.message}
            />
            <div className="col-span-[1/2] flex justify-center">
              {reset.check_in !== null && (
                <Button variant="outline" type="button" onClick={handleClearCheckIn} className="w-full @xl:w-auto mt-6">
                  Clear Check In
                </Button>
              )}
            </div>

            <Input
              type="time"
              label="Check out"
              className="col-span-[1/2]"
              {...register('check_out')}
              error={errors.check_out?.message}
            />
            <div className="col-span-[1/2] flex justify-center">
              {reset.check_out !== null && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleClearCheckOut}
                  className="w-full @xl:w-auto mt-6"
                >
                  Clear Check Out
                </Button>
              )}
            </div>
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isUpdateLoading} className="w-full @xl:w-auto">
                Edit Attendanace
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
