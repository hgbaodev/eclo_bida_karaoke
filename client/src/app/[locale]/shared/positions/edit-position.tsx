'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { updatePosition, getAllPositions } from '@/store/slices/positionSlice';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { statusOptions, SalaryStructureOptions } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditPositionInput, editPositionSchema } from '@/utils/validators/position/edit-position.schema';
import { getStatusBadge } from '../users/users-table/columns';

export default function EditPosition({ position, active }: { position: EditPositionInput; active: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(position);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, updateLoading, status } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<EditPositionInput> = async (data) => {
    const result: any = await dispatch(updatePosition({ position: data, active }));

    if (updatePosition.fulfilled.match(result)) {
      setReset({
        name: '',
        salary: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getAllPositions({ page, pageSize, query, status }));
      toast.success('Position created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form<EditPositionInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={editPositionSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Edit a Position
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>

            <Input
              label="Name"
              placeholder="Enter postion name"
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />

            <Input
              type="number"
              label="Salary"
              placeholder="Enter position salary"
              className="col-span-full"
              {...register('base_salary')}
              error={errors.base_salary?.message}
            />
            <Controller
              name="salary_structure"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={SalaryStructureOptions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Salary Structure"
                  placeholder="Select a salary structure"
                  className="col-span-full"
                  error={errors?.status?.message}
                  getOptionValue={(option) => option.value}
                  getOptionDisplayValue={(option) => option.value}
                  displayValue={(selected: any) => selected}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
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

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={updateLoading} className="w-full @xl:w-auto">
                Edit Position
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
