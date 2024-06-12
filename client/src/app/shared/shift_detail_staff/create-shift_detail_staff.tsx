'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';

import {
  CreateShiftUserDetailInput,
  createShiftUserDetailSchema,
} from '@/utils/validators/shift-user-detail/create-shift-user-detail';
import { createShiftUserDetail, getAllShiftUserDetails } from '@/store/slices/shift_user_detailSlice';
import toast from 'react-hot-toast';

export default function CreateShiftDetailStaff({ day_of_week, shift }: { day_of_week: string; shift: any }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { listStaffs, isCreateLoading } = useSelector((state: RootState) => state.staff);
  const onSubmit: SubmitHandler<CreateShiftUserDetailInput> = async (data) => {
    const result: any = await dispatch(createShiftUserDetail(data));

    if (createShiftUserDetail.fulfilled.match(result)) {
      setReset({
        // name: '',
        // birthday: '',
        // phone: '',
        // idcard: '',
        // address: '',
        // position: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getAllShiftUserDetails());
      toast.success('Created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form<CreateShiftUserDetailInput>
      resetValues={{ shift: shift.active, ...reset }}
      onSubmit={onSubmit}
      validationSchema={createShiftUserDetailSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add A Staff Into Shift
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Day of week"
              {...register('day_of_week')}
              className="col-span-full"
              value={day_of_week}
              readOnly
            />
            <Input label="Shift" className="col-span-full" value={shift.time_in + '-' + shift.time_out} readOnly />
            <Controller
              name="staff"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={listStaffs}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Staff"
                  className="col-span-full custom-dropdown"
                  placeholder="Select a staff"
                  error={errors?.staff?.message}
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.name}
                  displayValue={(selected: string) =>
                    listStaffs.find((option) => option.active === selected)?.name ?? selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Create
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
