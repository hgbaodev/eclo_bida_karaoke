'use client';

import { useState, useEffect } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { getServiceDevicesDetail, updateServiceDeviceDetail } from '@/store/slices/service_device_detailSlice';
import { getDevices } from '@/store/slices/deviceSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import {
  EditServiceDeviceDetailInput,
  EditServiceDeviceDetailSchema,
} from '@/utils/validators/edit-service-device-detail.schema';
import { getStatusBadge } from './service-devices-table/columns';
import { statusOptions } from './service-devices-table/type';

export default function EditServiceDeviceDetail({
  device,
  active,
  serviceActive,
}: {
  device: EditServiceDeviceDetailInput;
  active: string;
  serviceActive: string;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(device);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isUpdateLoading } = useSelector(
    (state: RootState) => state.service_device_detail,
  );

  const { data } = useSelector((state: RootState) => state.device);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(getDevices({ page, pageSize, query, status }));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetch();
  }, [page, pageSize, query, status]);

  const onSubmit: SubmitHandler<EditServiceDeviceDetailInput> = async (data) => {
    const result: any = await dispatch(updateServiceDeviceDetail({ device: data, active }));
    if (updateServiceDeviceDetail.fulfilled.match(result)) {
      setReset({
        device: '',
        quantity: 0,
        maintaining_quantity: 0,
        status: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getServiceDevicesDetail({ page, pageSize, query, status, serviceActive }));
      toast.success('Device updated successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<EditServiceDeviceDetailInput>
      resetValues={reset}
      onSubmit={onSubmit}
      //@ts-ignore
      validationSchema={EditServiceDeviceDetailSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Update service device
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
                  label="Device"
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
              label="Quantity"
              placeholder="quantity"
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
            <Input
              label="Under maintenace"
              placeholder="Under maintenace quantity"
              {...register('maintaining_quantity')}
              className="col-span-[1/2]"
              error={errors.maintaining_quantity?.message}
            />

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isUpdateLoading} className="w-full @xl:w-auto">
                Update this record
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
