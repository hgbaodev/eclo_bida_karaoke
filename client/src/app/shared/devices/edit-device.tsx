'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, FileInput } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { getDevices, updateDevice } from '@/store/slices/deviceSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditDeviceInput, editDeviceSchema } from '@/utils/validators/edit-device.schema';
import { getStatusBadge } from './devices-table/columns';
import { statusOptions } from './type';

export default function EditDevice({ device, active }: { device: EditDeviceInput; active: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(device);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isUpdateLoading } = useSelector((state: RootState) => state.device);
  const onSubmit: SubmitHandler<EditDeviceInput> = async (data) => {
    if (data['image'] && data['image'].length > 0) {
      const imageFile = data['image'][0];
      const formData = new FormData();

      formData.append('image', imageFile);
      formData.append('name', data.name);
      formData.append('status', data.status);
      formData.append('_method', 'PUT');
      formData.append('description', data.description);

      try {
        const result: any = await dispatch(updateDevice({ formData, active }));
        if (updateDevice.fulfilled.match(result)) {
          setReset({
            name: '',
            status: '',
            description: '',
          });
          setErrors({});
          closeModal();
          await dispatch(getDevices({ page, pageSize, query, status }));
          toast.success('Device updated successfully');
        } else {
          setErrors(result?.payload?.errors);
        }
      } catch (error) {
        console.error('Failed to edit device', error);
        toast.error('Failed to edit device');
      }
    }
  };

  return (
    <Form<EditDeviceInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={editDeviceSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Update device
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <FileInput
              label="Image"
              placeholder="Select an image"
              {...register('image')}
              className="col-span-full"
              accept="image/jpeg, image/jpg, image/png, image/webp"
              error={errors.image?.message?.toString() || ''}
            />
            <Input
              label="Name"
              placeholder="Enter device name"
              {...register('name')}
              className="col-span-[1/2]"
              error={errors.name?.message}
            />
            <Input
              label="Desription"
              placeholder="Enter device description"
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
                Update device
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
