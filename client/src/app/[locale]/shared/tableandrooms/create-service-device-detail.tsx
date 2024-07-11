'use client';

import { useState, useEffect } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { getServiceDevicesDetail, createServiceDeviceDetail } from '@/store/slices/service_device_detailSlice';
import { getAllDevices } from '@/store/slices/deviceSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import {
  CreateServiceDeviceDetailInput,
  CreateServiceDeviceDetailSchema,
} from '@/utils/validators/service-device-detail/create-service-device-detail.schema';
import StatusBadge from './service-devices-table/status-badge';
import { statusOptions } from './service-devices-table/type';
import { useTranslations } from 'next-intl';

export default function CreateServiceDeviceDetail({ serviceActive }: { serviceActive: string }) {
  const t = useTranslations('tables_rooms');
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>();
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isUpdateLoading } = useSelector(
    (state: RootState) => state.service_device_detail,
  );

  const { data } = useSelector((state: RootState) => state.device);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(getAllDevices());
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetch();
  }, [page, pageSize, query, status]);

  const onSubmit: SubmitHandler<CreateServiceDeviceDetailInput> = async (data) => {
    //@ts-ignore
    data['service'] = serviceActive;
    try {
      const result: any = await dispatch(createServiceDeviceDetail({ serviceDeviceDetail: data }));
      if (createServiceDeviceDetail.fulfilled.match(result)) {
        setReset({
          device: '',
          quantity: 0,
          maintenance_quantity: 0,
          status: '',
        });
        setErrors({});
        closeModal();
        await dispatch(getServiceDevicesDetail({ page, pageSize, query, status, serviceActive }));
        toast.success('Device updated successfully');
      } else {
        closeModal(); // Close the modal on failure
        const errorMessage = result.payload?.errors || 'Failed to create service device detail.';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create service device detail. Please try again.');
    }
  };

  return (
    <Form<CreateServiceDeviceDetailInput>
      resetValues={reset}
      onSubmit={onSubmit}
      //@ts-ignore
      validationSchema={CreateServiceDeviceDetailSchema}
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

            <Controller
              name="device"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={data}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label={t('device')}
                  className="col-span-full"
                  placeholder="Select a device"
                  error={errors?.device?.message}
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.name}
                  displayValue={(selected: string) =>
                    data.find((option) => option.active === selected)?.name ?? selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />

            <Input
              label={t('quantity')}
              placeholder={t('quantity')}
              {...register('quantity')}
              className="col-span-[1/2]"
              error={errors.quantity?.message}
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
            <Input
              label={t('under_maintenance')}
              placeholder={t('under_maintenance_quantity')}
              {...register('maintenance_quantity')}
              className="col-span-[1/2]"
              error={errors.maintenance_quantity?.message}
            />

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                {t('cancel')}
              </Button>
              <Button type="submit" isLoading={isUpdateLoading} className="w-full @xl:w-auto">
                {t('create')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
