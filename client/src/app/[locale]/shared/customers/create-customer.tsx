'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { CreateCustomerInput, CreateCustomerSchema } from '@/utils/validators/customer/create-customer.schema';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { statusOptions } from './type';
import { dispatch } from '@/store';
import { createCustomer, getCustomers } from '@/store/slices/customer_slice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { StatusBadge } from './customers-table/columns';
import { useTranslations } from 'next-intl';

export default function CreateCustomer() {
  const t = useTranslations('customers');
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isCreateLoading } = useSelector((state: RootState) => state.customer);
  const onSubmit: SubmitHandler<CreateCustomerInput> = async (data) => {
    const result: any = await dispatch(createCustomer(data));

    if (createCustomer.fulfilled.match(result)) {
      setReset({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        status: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getCustomers({ page, pageSize, query, status }));
      toast.success(t('customer_created_successfully'));
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<CreateCustomerInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={CreateCustomerSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('add_new_customer')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label={t('first_name')}
              placeholder={t('enter_customers_first_name')}
              {...register('first_name')}
              className="col-span-[1/2]"
              error={errors.first_name?.message}
            />
            <Input
              label={t('last_name')}
              placeholder={t('enter_customers_last_name')}
              {...register('last_name')}
              className="col-span-[1/2]"
              error={errors.last_name?.message}
            />

            <Input
              label={t('email')}
              placeholder={t('enter_customers_email_address')}
              className="col-span-full"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label={t('phone')}
              placeholder={t('enter_customers_phone')}
              className="col-span-full"
              {...register('phone')}
              error={errors.phone?.message}
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
                  label={t('status')}
                  placeholder={t('select_a_status')}
                  className="col-span-full"
                  error={errors?.status?.message}
                  getOptionValue={(option: { value: any }) => option.value}
                  getOptionDisplayValue={(option: { value: any }) => StatusBadge(option.value as any, t)}
                  displayValue={(selected: any) => StatusBadge(selected, t)}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                {t('cancel')}
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                {t('create_customer')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
