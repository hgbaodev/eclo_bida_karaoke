'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Password, Textarea, RadioGroup, Radio, FileInput } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { updateStaff, getStaffs } from '@/store/slices/staffSlice';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { statusOptions } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditStaffInput, editStaffSchema } from '@/utils/validators/staff/edit-staff.schema';
import { getStatusBadge } from '../users/users-table/columns';
import { updateUser } from '@/store/slices/userSlice';

export default function EditStaff({
  staff,
  active,
  activeUser,
}: {
  staff: EditStaffInput;
  active: string;
  activeUser: string;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(staff);
  const [errors, setErrors] = useState<any>({});
  const { listRoles } = useSelector((state: RootState) => state.role);
  const { pageSize, page, query, isUpdateLoading, position, status } = useSelector((state: RootState) => state.staff);
  const { listPositions } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<EditStaffInput> = async (data) => {
    if (data['image'] && data['image'].length > 0) {
      const imageFile = data['image'][0];
      const dataUser = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        role: data.role,
        status: 'A',
      };
      // Lưu thông tin người dùng nếu có
      const userResult: any = await dispatch(updateUser({ user: dataUser, active: activeUser }));
      if (!updateUser.fulfilled.match(userResult)) {
        setErrors(userResult?.payload?.errors);
      } else {
        activeUser = userResult.payload.data.active;
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
      formData.append('_method', 'PUT');
      formData.append('status', data.status);
      formData.append('position', data.position);
      formData.append('user', active);
      const result: any = await dispatch(updateStaff({ staff: formData, active }));
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
        toast.success('Staff edited successfully');
      } else {
        setErrors(result?.payload?.errors);
      }
    } else {
      console.error('Image is not valid', data['image']);
      toast.error('Image is not valid');
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
            <FileInput
              label="Image"
              placeholder="Select an image"
              {...register('image')}
              className="col-span-full"
              accept="image/jpeg, image/jpg, image/png, image/webp"
              error={errors.image?.message?.toString() || ''}
            />
            <Input
              label="IDCard"
              placeholder="Enter staff idcard"
              className="col-span-[1/2]"
              {...register('idcard')}
              error={errors.idcard?.message}
            />
            <Input
              label="First Name"
              placeholder="Enter staff first name"
              {...register('first_name')}
              className="col-span-[1/2]"
              error={errors.first_name?.message}
            />
            <Input
              label="Last Name"
              placeholder="Enter staff last name"
              {...register('last_name')}
              className="col-span-[1/2]"
              error={errors.last_name?.message}
            />
            <div className="col-span-[1/2]">
              <label className="block mb-3 text-sm font-medium text-gray-700">Gender</label>
              <Controller
                name="gender"
                control={control}
                defaultValue="M"
                render={({ field: { name, onChange, value } }) => (
                  <RadioGroup value={value} setValue={onChange} className="flex gap-4">
                    <Radio label="Male" value="M" />
                    <Radio label="Female" value="F" />
                  </RadioGroup>
                )}
              />
            </div>
            <Input
              type="date"
              label="Birthday"
              placeholder="Enter staff birthday"
              {...register('birthday')}
              className="col-span-[1/2]"
              error={errors.birthday?.message}
            />
            <Input
              label="Phone"
              placeholder="Enter staff phone number"
              className="col-span-[1/2]"
              {...register('phone')}
              error={errors.phone?.message}
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
            <Title as="h4" className="font-semibold">
              Edit User
            </Title>
            <Input
              label="Email"
              placeholder="Enter user's Email Address"
              className="col-span-full"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
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
                  label="Role"
                  className="col-span-[1/2]"
                  placeholder="Select a role"
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
