'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import {
  CreateServiceTypeInput,
  CreateServiceTypeSchema,
} from '@/utils/validators/service-type/create-service-type.schema';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { statusOptions } from './type';
import { dispatch } from '@/store';
import { createServiceType, getServiceTypes } from '@/store/slices/service_type_slice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { StatusBadge } from './service_types-table/columns';
import { useTranslations } from 'next-intl';

export default function CreateSupplier() {
  const t = useTranslations('service_type');
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isCreateLoading } = useSelector((state: RootState) => state.service_type);
  const onSubmit: SubmitHandler<CreateServiceTypeInput> = async (data) => {
    const result: any = await dispatch(createServiceType(data));

    if (createServiceType.fulfilled.match(result)) {
      setReset({
        name: '',
        status: '',
        service_active: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getServiceTypes({ page, pageSize, query, status }));
      toast.success(t('successful'));
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<CreateServiceTypeInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={CreateServiceTypeSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('create')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label={t('name')}
              placeholder={t('enter_name')}
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
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
                  placeholder="Select a status"
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
                {t('create')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
