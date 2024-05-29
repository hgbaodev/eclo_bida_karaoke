'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Textarea } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CreateAreaInput, createAreaSchema } from '@/utils/validators/create-area.schema';
import { dispatch } from '@/store';
import { editArea } from '@/store/slices/areaSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';

export default function EditArea({ name, description, active }: { name: string; description: string; active: string }) {
  const { isEditLoading } = useSelector((state: RootState) => state.area);
  const { closeModal } = useModal();
  const [reset, setReset] = useState({ name, description });
  const [errors, setErrors] = useState<any>({});
  const onSubmit: SubmitHandler<CreateAreaInput> = async (data) => {
    const result: any = await dispatch(editArea({ name: data.name, description: data.description, active }));
    if (editArea.fulfilled.match(result)) {
      setReset({
        name: '',
        description: '',
      });
      setErrors({});
      closeModal();
      toast.success('Area edit successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<CreateAreaInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createAreaSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                EditArea
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Name"
              placeholder="Enter area name"
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />
            <Textarea
              label="Description"
              placeholder="Enter area description"
              {...register('description')}
              className="col-span-full"
              error={errors.description?.message}
            />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isEditLoading} className="w-full @xl:w-auto">
                Edit Area
              </Button>
              <Button type="submit" className="w-full @xl:w-auto" color="danger">
                Delete
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
