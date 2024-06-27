'use client';
import { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';

import {
  CreateShiftUserDetailInput,
  createShiftUserDetailSchema,
} from '@/utils/validators/shift-user-detail/create-shift-user-detail';
import {
  createShiftUserDetail,
  getAllShiftUserDetails,
  getShiftUserDetails,
} from '@/store/slices/shift_user_detailSlice';
import toast from 'react-hot-toast';
import { OptionType } from 'dayjs';

export default function CreateAttendance() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { isCreateLoading } = useSelector((state: RootState) => state.staff);
  const { oneWorkShift } = useSelector((state: RootState) => state.work_shift);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const currentDate = `${year}-${month}-${day}`;

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const onSubmit: SubmitHandler<CreateShiftUserDetailInput> = async (data) => {
    const result: any = await dispatch(createShiftUserDetail(data));
    if (createShiftUserDetail.fulfilled.match(result)) {
      setReset({});
      setErrors({});
      closeModal();
      await dispatch(getShiftUserDetails(oneWorkShift.active));
      toast.success('Created successfully');
    } else {
      setErrors(result?.payload?.errors);
      toast.error(result.payload.errors);
      closeModal();
    }
  };
  return (
    <Form<CreateShiftUserDetailInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createShiftUserDetailSchema}
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
            <Input label="Staff UUID" placeholder="Enter staff uuid" className="col-span-full" />
            <Time />
            <Input label="Date" className="col-span-[1/2]" value={currentDate} />
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

const customStyles: StylesConfig<OptionType, boolean> = {
  menu: (provided, state) => ({
    ...provided,
    zIndex: 9999,
    position: 'absolute',
    maxHeight: '300px',
    marginTop: '-1px',
    background: 'white',
  }),
};

const Time = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  }, []);

  return <Input type="time" label="Time" className="col-span-[1/2]" value={currentTime} readOnly />;
};
