'use client';

import { useEffect, useState } from 'react';
import { PiCheckBold, PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { permissions } from '@/app/[locale]/shared/roles-permissions/utils';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { ActionIcon, AdvancedCheckbox, Title, Button, CheckboxGroup } from 'rizzui';
import { Form } from '@/components/ui/form';
import { RolePermissionInput, rolePermissionSchema } from '@/utils/validators/role/edit-role.schema';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { getFunctionals, updateRole } from '@/store/slices/roleSlice';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

export default function EditRole({
  id,
  name,
  functionals,
}: {
  id: number;
  name: string;
  functionals: RolePermissionInput;
}) {
  const { closeModal } = useModal();
  const t = useTranslations('roles_permissions');
  const { updateLoading, listFunctionals } = useSelector((state: RootState) => state.role);

  useEffect(() => {
    dispatch(getFunctionals());
  }, []);

  const [errors, setErrors] = useState({} as any);

  const onSubmit: SubmitHandler<any> = (data) => {
    const values = {
      id: id,
      functionals: data,
    };
    dispatch(updateRole(values)).then((action: any) => {
      if (updateRole.fulfilled.match(action)) {
        toast.success(t('role.update_success'));
        closeModal();
      } else {
        setErrors(action.payload.errors);
      }
    });
  };

  return (
    <Form<RolePermissionInput>
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: functionals,
      }}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6  @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('role.edit_role')} - {name}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>

            <div className="grid gap-4 divide-y divide-y-reverse divide-gray-200">
              <Title as="h5" className="mb-2 text-base font-semibold">
                {t('role.role_access')}
              </Title>
              {listFunctionals.map(({ label, value }) => {
                const parent = value.toLowerCase();
                return (
                  <div key={value} className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between">
                    <Title as="h6" className="font-medium text-gray-700 2xl:text-sm">
                      {label}
                    </Title>
                    <Controller
                      //@ts-ignore
                      name={value.toLowerCase()}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CheckboxGroup
                          values={value as string[]}
                          setValues={onChange}
                          className="grid grid-cols-3 gap-4 md:flex"
                        >
                          {permissions.map(({ value, label }) => (
                            <AdvancedCheckbox
                              key={value}
                              name={`${parent}.${value.toLowerCase()}`}
                              value={value}
                              inputClassName="[&:checked~span>.icon]:block"
                              contentClassName="flex items-center justify-center"
                            >
                              <PiCheckBold className="icon me-1 hidden h-[14px] w-[14px] md:h-4 md:w-4" />
                              <span className="font-medium">{t(`permissions.${label.toLowerCase()}`)}</span>
                            </AdvancedCheckbox>
                          ))}
                        </CheckboxGroup>
                      )}
                    />
                  </div>
                );
              })}
            </div>

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                {t('role.cancel')}
              </Button>
              <Button type="submit" isLoading={updateLoading} className="w-full @xl:w-auto">
                {t('role.save')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
