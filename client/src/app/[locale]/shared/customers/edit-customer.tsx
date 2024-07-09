'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { getCustomers, updateCustomer } from '@/store/slices/customerSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditCustomerInput, editCustomerSchema } from '@/utils/validators/customer/edit-customer.schema';
import { getStatusBadge } from './customers-table/columns';
import { statusOptions } from './type';

export default function EditCustomer({ customer, active }: { customer: EditCustomerInput; active: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(customer);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isUpdateLoading } = useSelector((state: RootState) => state.customer);
  const onSubmit: SubmitHandler<EditCustomerInput> = async (data) => {
    const result: any = await dispatch(updateCustomer({ customer: data, active }));
    if (updateCustomer.fulfilled.match(result)) {
      setReset({
        first_name: '',
        last_name: '',
        phone: '',
        status: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getCustomers({ page, pageSize, query, status }));
      toast.success('Customer update successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<EditCustomerInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={editCustomerSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Update customer
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="First Name"
              placeholder="Enter customer's first name"
              {...register('first_name')}
              className="col-span-[1/2]"
              error={errors.first_name?.message}
            />
            <Input
              label="Last Name"
              placeholder="Enter customer's last name"
              {...register('last_name')}
              className="col-span-[1/2]"
              error={errors.last_name?.message}
            />
            <Input
              label="Phone"
              placeholder="Enter customer's phone"
              className="col-span-full"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Input
              label="Email"
              placeholder="Enter customer's email"
              className="col-span-full"
              {...register('email')}
              error={errors.email?.message}
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
              <Button type="submit" isLoading={isUpdateLoading} className="w-full @xl:w-auto">
                Update customer
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
