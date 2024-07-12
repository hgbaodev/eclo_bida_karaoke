'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea, Password, RadioGroup, Radio, FileInput } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { createStaff, getStaffs } from '@/store/slices/staffSlice';
import { CreateStaffInput, createStaffSchema } from '@/utils/validators/staff/create-staff.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { statusOptions } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getStatusBadge } from './staffs-table/columns';
import { createUser } from '@/store/slices/userSlice';
import { createSalary } from '@/store/slices/salarySlice';
import { useTranslations } from 'next-intl';

export default function CreateStaff() {
  const t = useTranslations('staffs');
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [gender, setGender] = useState('M');
  const [errors, setErrors] = useState<any>({});
  const [addUser, setAddUser] = useState(false);
  const now = new Date();
  const Year = now.getFullYear();
  const Month = String(now.getMonth() + 1).padStart(2, '0');
  const { listRoles } = useSelector((state: RootState) => state.role);
  const { pageSize, page, query, isCreateLoading, position, status } = useSelector((state: RootState) => state.staff);
  const { listPositions } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<CreateStaffInput> = async (data) => {
    if (data['image'] && data['image'].length > 0) {
      const imageFile = data['image'][0];
      try {
        let active = '';
        // Lưu thông tin người dùng nếu có
        if (addUser) {
          const dataUser = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            role: data.role,
            status: 'A',
          };
          const userResult: any = await dispatch(createUser(dataUser));
          if (!createUser.fulfilled.match(userResult)) {
            setErrors(userResult?.payload?.errors);
          } else {
            active = userResult.payload.data.active;
          }
        }
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('birthday', data.birthday);
        formData.append('gender', data.gender);
        formData.append('phone', data.phone);
        formData.append('idcard', data.idcard);
        formData.append('address', data.address);
        formData.append('status', data.status);
        formData.append('position', data.position);
        formData.append('user', active);
        const result: any = await dispatch(createStaff(formData));
        const staffSalary = {
          staff: result.payload.data.active,
          month: Month,
          year: Year,
        };
        dispatch(createSalary(staffSalary));
        if (createStaff.fulfilled.match(result)) {
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
          toast.success(t('create_success'));
        } else {
          setErrors(result?.payload?.errors);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        // Xử lý lỗi nếu cần thiết
      }
    } else {
      console.error('Image is not valid', data['image']);
      toast.error('Image is not valid');
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
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('title_create')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <FileInput
              label={t('image')}
              placeholder="Select an image"
              {...register('image')}
              className="col-span-full"
              accept="image/jpeg, image/jpg, image/png, image/webp"
              error={errors.image?.message?.toString() || ''}
            />
            <Input
              label={t('idcard')}
              placeholder={t('input_idcard')}
              className="col-span-[1/2]"
              {...register('idcard')}
              error={errors.idcard?.message}
            />
            <Input
              label={t('first_name')}
              placeholder={t('input_firstname')}
              {...register('first_name')}
              className="col-span-[1/2]"
              error={errors.first_name?.message}
            />
            <Input
              label={t('last_name')}
              placeholder={t('input_lastname')}
              {...register('last_name')}
              className="col-span-[1/2]"
              error={errors.last_name?.message}
            />
            <div className="col-span-[1/2]">
              <label className="block mb-3 text-sm font-medium text-gray-700">{t('gender')}</label>
              <Controller
                name="gender"
                control={control}
                defaultValue="M"
                render={({ field }) => (
                  <RadioGroup value={field.value} setValue={field.onChange} className="flex gap-4">
                    <Radio label={t('male')} value="M" />
                    <Radio label={t('female')} value="F" />
                  </RadioGroup>
                )}
              />
            </div>
            <Input
              type="date"
              label={t('birthday')}
              placeholder={t('input_birthday')}
              {...register('birthday')}
              className="col-span-[1/2]"
              error={errors.birthday?.message}
            />

            <Input
              type="number"
              label={t('phone')}
              placeholder={t('input_phone')}
              className="col-span-[1/2]"
              {...register('phone')}
              error={errors.phone?.message}
            />

            <Textarea
              rows={2}
              label={t('address')}
              placeholder={t('input_address')}
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
                  label={t('position')}
                  className="col-span-[1/2]"
                  placeholder={t('input_position')}
                  error={errors?.position?.message}
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.name}
                  displayValue={(selected: string) =>
                    listPositions.find((option) => option.active === selected)?.name ?? selected
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
                  placeholder={t('input_status')}
                  className="col-span-[1/2]"
                  error={errors?.status?.message}
                  getOptionValue={(option: { value: any }) => option.value}
                  getOptionDisplayValue={(option: { value: any }) => getStatusBadge(option.value as any, t)}
                  displayValue={(selected: any) => getStatusBadge(selected, t)}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />

            <div className="col-span-full flex items-center gap-2">
              <input
                type="checkbox"
                id="addUserCheckbox"
                checked={addUser}
                onChange={(e) => setAddUser(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="addUserCheckbox" className="ml-2 block text-sm text-gray-900">
                {t('add_user_information')}
              </label>
            </div>

            {/* Conditional rendering for user information */}
            {addUser && (
              <>
                <Title as="h4" className="font-semibold">
                  {t('title_adduser')}
                </Title>
                <Input
                  label="Email"
                  placeholder={t('input_email')}
                  className="col-span-full"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Password
                  label={t('password')}
                  placeholder={t('input_password')}
                  className="col-span-[1/2]"
                  {...register('password')}
                  error={errors.password?.message}
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
                      className="col-span-[1/2]"
                      placeholder={t('input_role')}
                      error={errors?.role?.message}
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
              </>
            )}
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                {t('cancel')}
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                {t('create_staff')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
