'use client';
import { useState } from 'react';
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

export default function CreateShiftDetailStaff({ day_of_week, shift }: { day_of_week: string; shift: any }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { listStaffs, isCreateLoading } = useSelector((state: RootState) => state.staff);
  const { oneWorkShift } = useSelector((state: RootState) => state.work_shift);
  const onSubmit: SubmitHandler<CreateShiftUserDetailInput> = async (data) => {
    const result: any = await dispatch(createShiftUserDetail(data));
    console.log(result);
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
      resetValues={{ shift: shift.active, ...reset, workshift: oneWorkShift.active }}
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
                Add A Staff Into Shift
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <label style={{ fontWeight: 'bold' }}>Staff:</label>
            <Controller
              name="staff"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    options={listStaffs}
                    value={listStaffs.find((option) => option.active === field.value)}
                    onChange={(option) => field.onChange(option.active)}
                    name={field.name}
                    className="col-span-full"
                    placeholder="Select a staff"
                    isSearchable
                    styles={customStyles}
                    getOptionValue={(option) => option.active}
                    getOptionLabel={(option) => `${option.name} - ${option.idcard}`}
                    aria-invalid={errors.staff ? 'true' : 'false'}
                  />
                  {errors.staff && <span className="error-message">{errors.staff.message}</span>}
                </>
              )}
            />
            <Input
              label="Day of week"
              {...register('day_of_week')}
              className="col-span-full"
              value={day_of_week}
              readOnly
            />
            <Input label="Shift" className="col-span-full" value={shift.time_in + '-' + shift.time_out} readOnly />
            <Input
              label="Work Shift"
              className="col-span-full"
              value={oneWorkShift.date_start + '->' + oneWorkShift.date_end}
              readOnly
            />
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
