'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { getServiceTypes, updateServiceType } from '@/store/slices/service_type_slice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditServiceTypeInput, EditServiceTypeSchema } from '@/utils/validators/service-type/edit-service-type.schema';
import { StatusBadge } from './service_types-table/columns';
import { statusOptions } from './type';
import { useTranslations } from 'next-intl';

export default function EditServiceType({
  service_type,
  active,
}: {
  service_type: EditServiceTypeInput;
  active: string;
}) {
  const t = useTranslations('service_type');
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(service_type);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isUpdateLoading } = useSelector((state: RootState) => state.service_type);
  const onSubmit: SubmitHandler<EditServiceTypeInput> = async (data) => {
    const result: any = await dispatch(updateServiceType({ service_type: data, active }));
    if (updateServiceType.fulfilled.match(result)) {
      setReset({
        name: '',
        status: '',
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
    <Form<EditServiceTypeInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={EditServiceTypeSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('update')}
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
              <Button type="submit" isLoading={isUpdateLoading} className="w-full @xl:w-auto">
                {t('update')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
