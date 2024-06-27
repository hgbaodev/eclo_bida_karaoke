'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Textarea, FileInput } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { CreateDeviceInput, createDeviceSchema } from '@/utils/validators/create-device.schema';
import { dispatch } from '@/store';
import { createDevice, getDevices } from '@/store/slices/deviceSlice';
import toast from 'react-hot-toast';

export default function CreateDevice() {
  const [reset, setReset] = useState({});
  const { closeModal } = useModal();
  const [errors, setErrors] = useState<any>({});
  const { page, pageSize, query, isCreateLoading, status } = useSelector((state: RootState) => state.device);

  const onSubmit: SubmitHandler<CreateDeviceInput> = async (data: any) => {
    if (data['image'] && data['image'].length > 0) {
      const imageFile = data['image'][0];
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('name', data.name);
      formData.append('description', data.description);
      try {
        const result: any = await dispatch(createDevice(formData));
        if (createDevice.fulfilled.match(result)) {
          setReset({
            name: '',
            description: '',
            status: '',
          });
          setErrors({});
          closeModal();
          await dispatch(getDevices({ page, pageSize, query, status }));
          toast.success('Device created successfully');
        } else {
          setErrors(result?.payload?.errors);
        }
      } catch (error) {
        console.error('Failed to create device', error);
        toast.error('Failed to create device');
      }
    } else {
      console.error('Image is not valid', data['image']);
      toast.error('Image is not valid');
    }
  };

  return (
    <Form<CreateDeviceInput>
      onSubmit={onSubmit}
      validationSchema={createDeviceSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Device
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
              className="col-span-full"
              error={errors.name?.message}
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
              {...register('description')}
              className="col-span-full"
              error={errors.description?.message}
            />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Create Device
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
