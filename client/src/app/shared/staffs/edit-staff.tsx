'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Password, Textarea } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { updateStaff, getStaffs } from '@/store/slices/staffSlice';
import { CreateStaffInput, createStaffSchema } from '@/utils/validators/create-staff.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { statusOptions } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditStaffInput, editStaffSchema } from '@/utils/validators/edit-staff.schema';
import { getStatusBadge } from '../users/users-table/columns';

export default function EditStaff({ staff, active }: { staff: EditStaffInput; active: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(staff);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isUpdateLoading, position, status } = useSelector((state: RootState) => state.staff);
  const { listPositions } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<CreateStaffInput> = async (data) => {
    const result: any = await dispatch(updateStaff({ staff: data, active }));

    if (updateStaff.fulfilled.match(result)) {
      setReset({
        name: '',
        birthday: '',
        phone: '',
        idcard: '',
        address: '',
        position: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getStaffs({ page, pageSize, query, position, status }));
      toast.success('User created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form<EditStaffInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={editStaffSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Edit a Staff
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="IDCard"
              placeholder="Enter staff idcard"
              className="col-span-[1/2]"
              {...register('idcard')}
              error={errors.idcard?.message}
            />

            <Input
              label="Name"
              placeholder="Enter staff name"
              {...register('name')}
              className="col-span-[1/2]"
              error={errors.name?.message}
            />

            <Input
              label="Phone"
              placeholder="Enter staff phone number"
              className="col-span-full"
              {...register('phone')}
              error={errors.phone?.message}
            />

            <Input
              type="date"
              label="Birthday"
              placeholder="Enter staff birthday"
              {...register('birthday')}
              className="col-span-full"
              error={errors.birthday?.message}
            />

            <Textarea
              rows={2}
              label="Address"
              placeholder="Enter staff address"
              className="col-span-full"
              {...register('address')}
              error={errors.address?.message}
            />

            <Controller
              name="position"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={listPositions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Position"
                  className="col-span-[1/2]"
                  placeholder="Select a position"
                  error={errors?.position?.message}
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.name}
                  displayValue={(selected: string) =>
                    listPositions.find((position) => position.active === selected)?.name ?? selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
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
                  className="col-span-[1/2]"
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
                Edit Staff
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}