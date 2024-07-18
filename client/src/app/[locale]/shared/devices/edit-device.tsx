'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, FileInput } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { getDevices, updateDevice } from '@/store/slices/device_slice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditDeviceInput, editDeviceSchema } from '@/utils/validators/device/edit-device.schema';
import { StatusBadge } from './devices-table/columns';
import { statusOptions } from './type';
import { useTranslations } from 'next-intl';

export default function EditDevice({ device, active }: { device: EditDeviceInput; active: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(device);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isUpdateLoading } = useSelector((state: RootState) => state.device);
  const t = useTranslations('devices');

  console.log(device);

  const onSubmit: SubmitHandler<EditDeviceInput> = async (data) => {
    const formData = new FormData();
    if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
      formData.append('image', data.image[0]);
    }
    formData.append('name', data.name);
    formData.append('status', data.status);
    formData.append('value', data.value.toString());
    formData.append('_method', 'PUT');
    formData.append('description', data.description);

    try {
      const result: any = await dispatch(updateDevice({ formData, active }));
      if (updateDevice.fulfilled.match(result)) {
        setReset({
          name: '',
          status: '',
          value: '',
          description: '',
          image: null,
        });
        setErrors({});
        closeModal();
        await dispatch(getDevices({ page, pageSize, query, status }));
        toast.success(t('device_updated_success'));
      } else {
        setErrors(result?.payload?.errors);
      }
    } catch (error) {
      console.error('Failed to edit device', error);
      toast.error(t('device_update_failed'));
    }
  };

  return (
    <Form<EditDeviceInput>
      resetValues={reset}
      onSubmit={onSubmit}
      //@ts-ignore
      validationSchema={editDeviceSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('update_device')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <FileInput
              label={t('image')}
              placeholder={t('select_image')}
              {...register('image')}
              className="col-span-full"
              accept="image/jpeg, image/jpg, image/png, image/webp"
              error={errors.image?.message?.toString() || ''}
            />
            <Input
              label={t('value_label')}
              type="number"
              placeholder={t('enter_device_value')}
              className="col-span-full"
              {...register('value')}
              error={errors.value?.message}
            />
            <Input
              label={t('name_label')}
              placeholder={t('enter_device_name')}
              {...register('name')}
              className="col-span-[1/2]"
              error={errors.name?.message}
            />
            <Input
              label={t('description_label')}
              placeholder={t('enter_device_description')}
              {...register('description')}
              className="col-span-[1/2]"
              error={errors.description?.message}
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
                  label={t('status_label')}
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
                {t('update')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
