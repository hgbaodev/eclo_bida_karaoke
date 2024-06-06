'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { createShiftDetail, getAllShiftDetails } from '@/store/slices/shift_detailSlice';
import {
  createShiftDetailSchema,
  CreateShiftDetailInput,
} from '@/utils/validators/shift-detail/create-shift_detail.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { DayOfWeekOptions } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';

export default function CreateShiftDetail() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isCreateLoading } = useSelector((state: RootState) => state.shift_detail);
  const { listShifts } = useSelector((state: RootState) => state.shift);
  const onSubmit: SubmitHandler<CreateShiftDetailInput> = async (data) => {
    const result: any = await dispatch(createShiftDetail(data));

    if (createShiftDetail.fulfilled.match(result)) {
      setReset({
        quantiy_of_staff: '',
        shift_id: '',
        day_of_week: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getAllShiftDetails({ page, pageSize, query }));
      toast.success('Shift detail created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form<CreateShiftDetailInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createShiftDetailSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Shift Detail
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              type="number"
              label="Quantity of Staff"
              placeholder="Enter quantity of staff"
              className="col-span-full"
              {...register('quantity_of_staff')}
              error={errors.quantity_of_staff?.message}
            />
            <Controller
              name="day_of_week"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={DayOfWeekOptions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Day Of Week"
                  placeholder="Select day of week"
                  className="col-span-full"
                  error={errors?.day_of_week?.message}
                  getOptionValue={(option: { value: any }) => option.value}
                  getOptionDisplayValue={(option: { value: any }) => option.value}
                  displayValue={(selected: any) => selected.value}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <Controller
              name="shift_id"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={listShifts}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Shift"
                  className="col-span-full"
                  placeholder="Select a shift"
                  error={errors?.shift_id?.message}
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.time_in + '-' + option.time_out}
                  displayValue={(selected: string) =>
                    listShifts.find((option) => option.active === selected)?.time_in.time_out ?? selected
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
                Create Shift Detail
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
