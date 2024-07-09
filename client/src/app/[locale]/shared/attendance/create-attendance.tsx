'use client';
import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import toast from 'react-hot-toast';
import { Attendance, getAttendances } from '@/store/slices/attendanceSlice';
import { AttendanceInput, AttendanceSchema } from '@/utils/validators/attendance/attendance-schema';

export default function CreateAttendance() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { isCreateLoading } = useSelector((state: RootState) => state.staff);
  const { month, year } = useSelector((state: RootState) => state.attendance);
  const now = new Date();
  const Year = now.getFullYear();
  const Month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const [currentTime, setCurrentTime] = useState('');
  const currentDate = `${Year}-${Month}-${day}`;
  const Time = () => {
    useEffect(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    }, []);

    return <Input type="time" label="Time" className="col-span-[1/2]" value={currentTime} readOnly />;
  };
  const onSubmit: SubmitHandler<AttendanceInput> = async (data) => {
    const dataAttendance = {
      uuid: data.uuid,
      day: data.day,
      time: data.time,
      update: false,
    };
    const result: any = await dispatch(Attendance(dataAttendance));
    console.log(result);
    if (Attendance.fulfilled.match(result)) {
      setReset({});
      setErrors({});
      closeModal();
      toast.success('Created successfully');
      dispatch(getAttendances({ month, year }));
    } else {
      setErrors(result?.payload?.errors);
      toast.error(result.payload.errors);
      closeModal();
    }
  };
  return (
    <Form<AttendanceInput>
      resetValues={{ time: currentTime }}
      onSubmit={onSubmit}
      validationSchema={AttendanceSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add Attendance
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input label="Staff UUID" placeholder="Enter staff uuid" className="col-span-full" {...register('uuid')} />
            <Time />
            <Input label="Date" className="col-span-[1/2]" value={currentDate} {...register('day')} />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto" style={{ zIndex: 10 }}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto" style={{ zIndex: 10 }}>
                Create
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
