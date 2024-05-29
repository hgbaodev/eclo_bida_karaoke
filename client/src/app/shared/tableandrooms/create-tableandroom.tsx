'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Password } from 'rizzui';
import { CreateUserInput, createUserSchema } from '@/utils/validators/create-user.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { createUser, getUsers } from '@/store/slices/userSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';

export default function CreateTableAndRoom() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, role, isCreateLoading } = useSelector((state: RootState) => state.user);
  const onSubmit: SubmitHandler<CreateUserInput> = async (data) => {
    const result: any = await dispatch(createUser(data));

    if (createUser.fulfilled.match(result)) {
      setReset({
        first_name: '',
        last_name: '',
        email: '',
        role_id: '',
        status: '',
        password: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getUsers({ page, pageSize, query, status, role }));
      toast.success('User created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  return (
    <Form<CreateUserInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createUserSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Service
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
              name="status"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={[
                    {
                      value: 'active',
                      label: 'Active',
                    },
                    {
                      value: 'inactive',
                      label: 'Inactive',
                    },
                  ]}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Status"
                  placeholder="Select a status"
                  className="col-span-full"
                  error={errors?.status?.message}
                  getOptionValue={(option: { value: any }) => option.value}
                  getOptionDisplayValue={(option: { value: any }) => option.value}
                  displayValue={(selected: any) => selected}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <Password
              label="Password"
              placeholder="Enter your passwoord"
              className="col-span-full"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Create User
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
