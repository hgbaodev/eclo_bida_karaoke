'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { CreateSupplierInput, CreateSupplierSchema } from '@/utils/validators/supplier/create-supplier.schema';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { statusOptions } from './type';
import { dispatch } from '@/store';
import { createSupplier, getSuppliers } from '@/store/slices/supplier_slice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { StatusBadge } from './suppliers-table/columns';
import { useTranslations } from 'next-intl';

export default function CreateSupplier() {
  const t = useTranslations('suppliers');
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isCreateLoading } = useSelector((state: RootState) => state.customer);
  const onSubmit: SubmitHandler<CreateSupplierInput> = async (data) => {
    const result: any = await dispatch(createSupplier(data));

    if (createSupplier.fulfilled.match(result)) {
      setReset({
        name: '',
        address: '',
        phone: '',
        status: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getSuppliers({ page, pageSize, query, status }));
      toast.success(t('supplier_created_successfully'));
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<CreateSupplierInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={CreateSupplierSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('add_new_supplier')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label={t('name')}
              placeholder={t('enter_supplier_name')}
              {...register('name')}
              className="col-span-[1/2]"
              error={errors.name?.message}
            />

            <Input
              label={t('address')}
              placeholder={t('enter_supplier_address')}
              className="col-span-full"
              {...register('address')}
              error={errors.address?.message}
            />

            <Input
              label={t('phone')}
              placeholder={t('enter_supplier_phone')}
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
                  placeholder={t('select_status')}
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
                {t('create_supplier')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
