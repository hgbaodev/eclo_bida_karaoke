'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Password } from 'rizzui';
import { CreateUserInput, createUserSchema } from '@/utils/validators/user/create-user.schema';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { roles, statusOptions } from './type';
import { dispatch } from '@/store';
import { createUser, getUsers } from '@/store/slices/userSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getStatusBadge } from './users-table/columns';
import { useTranslations } from 'next-intl';

export default function CreateUser() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, role, isCreateLoading } = useSelector((state: RootState) => state.user);
  const { listRoles } = useSelector((state: RootState) => state.role);
  const t = useTranslations('users'); // Initialize useTranslations hook

  const onSubmit: SubmitHandler<CreateUserInput> = async (data) => {
    const result: any = await dispatch(createUser(data));

    if (createUser.fulfilled.match(result)) {
      setReset({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        status: '',
        password: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getUsers({ page, pageSize, query, status, role }));
      toast.success(t('user_created_successfully'));
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
      {({ setError, register, control, watch, formState: { errors } }) => (
        <>
          <div className="col-span-full flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              {t('add_new_user')}
            </Title>
            <ActionIcon size="sm" variant="text" onClick={closeModal}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>
          <Input
            label={t('first_name')}
            placeholder={t('enter_user_first_name')}
            {...register('first_name')}
            className="col-span-[1/2]"
            error={errors.first_name?.message}
          />
          <Input
            label={t('last_name')}
            placeholder={t('enter_user_last_name')}
            {...register('last_name')}
            className="col-span-[1/2]"
            error={errors.last_name?.message}
          />

          <Input
            label={t('email')}
            placeholder={t('enter_user_email_address')}
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
                label={t('role')}
                className="col-span-full"
                placeholder={t('select_a_role')}
                error={errors?.status?.message}
                getOptionValue={(option) => option.active}
                getOptionDisplayValue={(option) => option.name}
                displayValue={(selected: string) =>
                  listRoles.find((option) => option.active === selected)?.name ?? selected
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
                label={t('status')}
                placeholder={t('select_a_status')}
                className="col-span-full"
                error={errors?.status?.message}
                getOptionValue={(option: { value: any }) => option.value}
                getOptionDisplayValue={(option: { value: any }) => getStatusBadge(option.value as any, t)}
                displayValue={(selected: any) => getStatusBadge(selected, t)}
                dropdownClassName="!z-[1]"
                inPortal={false}
              />
            )}
          />
          <Password
            label={t('password')}
            placeholder={t('enter_your_password')}
            className="col-span-full"
            {...register('password')}
            error={errors.password?.message}
          />
          <div className="col-span-full flex items-center justify-end gap-4">
            <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
              {t('cancel')}
            </Button>
            <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
              {t('create_user')}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
