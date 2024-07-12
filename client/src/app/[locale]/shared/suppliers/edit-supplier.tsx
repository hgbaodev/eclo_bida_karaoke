'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { getSuppliers, updateSupplier } from '@/store/slices/supplier_slice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditSupplierInput, EditSupplierSchema } from '@/utils/validators/supplier/edit-supplier.schema';
import { StatusBadge } from './suppliers-table/columns';
import { statusOptions } from './type';
import { useTranslations } from 'next-intl';

export default function EditSupplier({ supplier, active }: { supplier: EditSupplierInput; active: string }) {
  const t = useTranslations('suppliers');
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(supplier);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isUpdateLoading } = useSelector((state: RootState) => state.supplier);
  const onSubmit: SubmitHandler<EditSupplierInput> = async (data) => {
    const result: any = await dispatch(updateSupplier({ supplier: data, active }));
    if (updateSupplier.fulfilled.match(result)) {
      setReset({
        name: '',
        phone: '',
        address: '',
        status: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getSuppliers({ page, pageSize, query, status }));
      toast.success(t('supplier_updated_successfully'));
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<EditSupplierInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={EditSupplierSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('update_supplier')}
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
              label={t('phone')}
              placeholder={t('enter_supplier_phone')}
              className="col-span-full"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Input
              label={t('address')}
              placeholder={t('enter_supplier_address')}
              className="col-span-full"
              {...register('address')}
              error={errors.address?.message}
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
              <Button type="submit" isLoading={isUpdateLoading} className="w-full @xl:w-auto">
                {t('update_supplier_button')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
