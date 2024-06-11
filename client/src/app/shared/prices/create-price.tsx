'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { CreatePriceInput, CreatePriceSchema } from '@/utils/validators/create-price.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { statusOptions } from './type';
import { dispatch } from '@/store';
import { createPrice, getPrices } from '@/store/slices/priceSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getStatusBadge } from './prices-table/columns';

export default function CreatePrice() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isCreateLoading } = useSelector((state: RootState) => state.price);
  const onSubmit: SubmitHandler<CreatePriceInput> = async (data) => {
    const result: any = await dispatch(createPrice(data));

    if (createPrice.fulfilled.match(result)) {
      setReset({
        name: '',
        pricePerHour: '',
        status: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getPrices({ page, pageSize, query, status }));
      toast.success('Price created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<CreatePriceInput>
      resetValues={reset}
      onSubmit={onSubmit}
      // @ts-ignore
      validationSchema={CreatePriceSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new price
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Name"
              placeholder="Enter price name"
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />

            <Input
              label="Price (VND/h)"
              type="number"
              placeholder="Enter price per hour"
              className="col-span-full"
              {...register('pricePerHour')}
              error={errors.pricePerHour?.message}
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
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Create price
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
