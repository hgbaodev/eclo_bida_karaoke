'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea, Password } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { createStaff, getStaffs } from '@/store/slices/staffSlice';
import { CreateStaffInput, createStaffSchema } from '@/utils/validators/create-staff.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { statusOptions } from './type';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getStatusBadge } from './staffs-table/columns';
import { createUser } from '@/store/slices/userSlice';
import { last } from 'lodash';

export default function CreateStaff() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const [addUser, setAddUser] = useState(false);
  const { listRoles } = useSelector((state: RootState) => state.role);
  const { pageSize, page, query, isCreateLoading, position, status } = useSelector((state: RootState) => state.staff);
  const { listPositions } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<CreateStaffInput> = async (data) => {
    try {
      let active = '';
      const dataUser = {
        first_name: data.name,
        last_name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        status: 'A',
      };
      // Lưu thông tin người dùng nếu có
      if (addUser) {
        const userResult: any = await dispatch(createUser(dataUser));
        if (!createUser.fulfilled.match(userResult)) {
          setErrors(userResult?.payload?.errors);
        } else {
          active = userResult.payload.data.active;
        }
      }
      const dataStaff = {
        name: data.name,
        birthday: data.birthday,
        phone: data.phone,
        idcard: data.idcard,
        address: data.address,
        status: data.status,
        position: data.position,
        user: active,
      };
      const result: any = await dispatch(createStaff(dataStaff));

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
        toast.success('Staff created successfully');
      } else {
        setErrors(result?.payload?.errors);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Xử lý lỗi nếu cần thiết
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
                Add a new Staff
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

            <div className="col-span-full flex items-center gap-2">
              <input
                type="checkbox"
                id="addUserCheckbox"
                checked={addUser}
                onChange={(e) => setAddUser(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="addUserCheckbox" className="ml-2 block text-sm text-gray-900">
                Add user information
              </label>
            </div>

            {/* Conditional rendering for user information */}
            {addUser && (
              <>
                <Title as="h4" className="font-semibold">
                  Add a new User
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
              </>
            )}
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Create Staff
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
