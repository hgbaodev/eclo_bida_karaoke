'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { createStaff, getStaffs } from '@/store/slices/staffSlice';
import { CreateStaffInput, createStaffSchema } from '@/utils/validators/create-staff.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';

export default function CreateWorkShift() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { listStaffs, isCreateLoading } = useSelector((state: RootState) => state.staff);
  const onSubmit: SubmitHandler<CreateStaffInput> = async (data) => {
    const result: any = await dispatch(createStaff(data));

    if (createStaff.fulfilled.match(result)) {
      //   setReset({
      //     name: '',
      //     birthday: '',
      //     phone: '',
      //     idcard: '',
      //     address: '',
      //     position: '',
      //   });
      //   setErrors({});
      //   closeModal();
      //   await dispatch(getStaffs({ page, pageSize, query, position, status }));
      //   toast.success('Staff created successfully');
      // } else {
      //   setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form<CreateStaffInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createStaffSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Copy Work Shift
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input label="Work Shift" className="col-span-full" />
            <Input
              type="date"
              label="Date Start"
              className="col-span-full"
              // {...register('idcard')}
            />
            <Input
              type="date"
              label="Date End"
              className="col-span-full"
              // {...register('idcard')}
            />

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Copy Work Shift
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
