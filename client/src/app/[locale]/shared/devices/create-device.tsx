'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea, FileInput } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { CreateDeviceInput, createDeviceSchema } from '@/utils/validators/device/create-device.schema';
import { dispatch } from '@/store';
import { createDevice, getDevices } from '@/store/slices/device_slice';
import toast from 'react-hot-toast';
import { StatusBadge } from './devices-table/columns';
import { statusOptions } from './type';
import { useTranslations } from 'next-intl';

export default function CreateDevice() {
  const [reset, setReset] = useState({});
  const { closeModal } = useModal();
  const [errors, setErrors] = useState<any>({});
  const { page, pageSize, query, isCreateLoading, status } = useSelector((state: RootState) => state.device);
  const t = useTranslations('devices');

  const onSubmit: SubmitHandler<CreateDeviceInput> = async (data: any) => {
    if (data['image'] && data['image'].length > 0) {
      const imageFile = data['image'][0];
      const formData = new FormData();

      formData.append('image', imageFile);
      formData.append('name', data.name.toString());
      formData.append('status', data.status.toString());
      formData.append('value', data.value.toString());
      formData.append('description', data.description.toString());

      try {
        const result: any = await dispatch(createDevice(formData));
        if (createDevice.fulfilled.match(result)) {
          setReset({
            value: '',
            name: '',
            description: '',
            status: '',
          });
          setErrors({});
          closeModal();
          await dispatch(getDevices({ page, pageSize, query, status }));
          toast.success(t('device_created_success'));
        } else {
          setErrors(result?.payload?.errors);
        }
      } catch (error) {
        console.error('Failed to create device', error);
        toast.error(t('device_create_failed'));
      }
    } else {
      console.error('Image is not valid', data['image']);
      toast.error(t('image_invalid'));
    }
  };

  return (
    <Form<CreateDeviceInput>
      onSubmit={onSubmit}
      //@ts-ignore
      validationSchema={createDeviceSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('add_new_device')}
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
              className="col-span-full"
              error={errors.name?.message}
            />
            <Textarea
              label={t('description_label')}
              placeholder={t('enter_description')}
              {...register('description')}
              className="col-span-full"
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
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                {t('create_device')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
