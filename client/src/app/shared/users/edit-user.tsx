'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { roles, statusOptions } from './type';
import { dispatch } from '@/store';
import { getUsers, updateUser } from '@/store/slices/userSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditUserInput, editUserSchema } from '@/utils/validators/edit-user.schema';
import { getStatusBadge } from './users-table/columns';

export default function EditUser({ user, active }: { user: EditUserInput; active: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(user);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, role, isUpdateLoading } = useSelector((state: RootState) => state.user);
  const { listRoles } = useSelector((state: RootState) => state.role);
  const onSubmit: SubmitHandler<EditUserInput> = async (data) => {
    const result: any = await dispatch(updateUser({ user: data, active }));
    if (updateUser.fulfilled.match(result)) {
      setReset({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        status: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getUsers({ page, pageSize, query, status, role }));
      toast.success('User update successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<EditUserInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={editUserSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Update user
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="First Name"
              placeholder="Enter user first name"
              {...register('first_name')}
              className="col-span-[1/2]"
              error={errors.first_name?.message}
            />
            <Input
              label="Last Name"
              placeholder="Enter user last name"
              {...register('last_name')}
              className="col-span-[1/2]"
              error={errors.last_name?.message}
            />

            <Input
              label="Email"
              placeholder="Enter user's Email Address"
              className="col-span-full"
              {...register('email')}
              error={errors.email?.message}
            />

            <Controller
              name="role"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={listRoles}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Role"
                  className="col-span-full"
                  placeholder="Select a role"
                  error={errors?.status?.message}
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.name}
                  displayValue={(selected: string) =>
                    listRoles.find((role) => role.active === selected)?.name || selected
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
                Update User
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
