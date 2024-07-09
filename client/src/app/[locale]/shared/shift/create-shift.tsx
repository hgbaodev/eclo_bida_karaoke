'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { shiftTypeOptions, statusOptions } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getShiftTypeBadge, getStatusBadge } from './shifts-table/colunms';
import { createShift, getAllShifts } from '@/store/slices/shiftSlice';
import { CreateShiftInput, createShiftSchema } from '@/utils/validators/shift/create-shift.schema';

export default function CreateShift() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isCreateLoading, status, shift_type } = useSelector((state: RootState) => state.shift);
  const onSubmit: SubmitHandler<CreateShiftInput> = async (data) => {
    const result: any = await dispatch(createShift(data));

    if (createShift.fulfilled.match(result)) {
      setReset({
        time_in: '',
        time_out: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getAllShifts({ page, pageSize, query, status, shift_type }));
      toast.success('Staff created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form<CreateShiftInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createShiftSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Shift
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              type="time"
              label="Time in"
              placeholder="Enter time in"
              {...register('time_in')}
              className="col-span-full"
              error={errors.time_in?.message}
            />

            <Input
              type="time"
              label="Time out"
              placeholder="Enter time out"
              {...register('time_out')}
              className="col-span-full"
              error={errors.time_out?.message}
            />

            <Controller
              name="status"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={statusOptions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Status"
                  placeholder="Select a status"
                  className="col-span-full"
                  error={errors?.status?.message}
                  getOptionValue={(option: { value: any }) => option.value}
                  getOptionDisplayValue={(option: { value: any }) => getStatusBadge(option.value as any)}
                  displayValue={(selected: any) => getStatusBadge(selected)}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <Controller
              name="shift_type"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={shiftTypeOptions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Shift Type"
                  placeholder="Select a shift type"
                  className="col-span-full"
                  error={errors?.status?.message}
                  getOptionValue={(option: { value: any }) => option.value}
                  getOptionDisplayValue={(option: { value: any }) => getShiftTypeBadge(option.value as any)}
                  displayValue={(selected: any) => getShiftTypeBadge(selected)}
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
                Create Shift
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
