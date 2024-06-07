'use client';
import React, { useState, useEffect } from 'react';
import AvatarCard from '@/components/ui/avatar-card';
// import { STATUSES, type User } from '@/data/users-data';
import { HeaderCell } from '@/components/ui/table';
import { dispatch } from '@/store';
import CustomSelect from '@/components/select/CustomSelect';
import { useSelector } from 'react-redux';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { getShifts } from '@/store/slices/shiftSlice';
import { RootState } from '@/store/types';
import { Form } from '@/components/ui/form';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Select } from 'rizzui';
import { CreateStaffInput } from '@/utils/validators/create-staff.schema';
import { createStaff, getStaffs } from '@/store/slices/staffSlice';
import toast from 'react-hot-toast';
export default function CreateShiftDetailStaff() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isCreateLoading, position, status } = useSelector((state: RootState) => state.staff);
  const { listShifts } = useSelector((state: RootState) => state.shift);
  useEffect(() => {
    dispatch(getShifts());
  }, []);
  const onSubmit: SubmitHandler<CreateStaffInput> = async (data) => {
    const result: any = await dispatch(createStaff(data));

    if (createStaff.fulfilled.match(result)) {
      setErrors({});
      closeModal();
      await dispatch(getStaffs({ page, pageSize, query, position, status }));
      toast.success('Staff created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form
      resetValues={reset}
      onSubmit={onSubmit}
      // validationSchema={createStaffSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <Controller
              name="position"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={listShifts}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Position"
                  className="col-span-[1/2]"
                  placeholder="Select a shift"
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.name}
                  displayValue={(selected: string) =>
                    listShifts.find((option) => option.active === selected)?.name ?? selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
          </>
        );
      }}
    </Form>
  );
}
export const getColumns = (openModal: (args: any) => void) => [
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, staff: Staff) => <AvatarCard src={staff.image} name={staff.name} description={staff.idcard} />,
  },

  {
    title: <HeaderCell title="T2" />,
    dataIndex: 'mon',
    key: 'mon',
    width: 100,
    render: (_: string, staff: Staff) => CreateShiftDetailStaff(),
  },
  {
    title: <HeaderCell title="T3" />,
    dataIndex: 'tue',
    key: 'tue',
    width: 100,
    render: (_: string, staff: Staff) => (
      <CustomSelect options={['Option 1', 'Option 2', 'Option 3']} placeholder="Select an shift" />
    ),
  },
  {
    title: <HeaderCell title="T4" />,
    dataIndex: 'wed',
    key: 'wed',
    width: 100,
    render: (_: string, staff: Staff) => (
      <CustomSelect options={['Option 1', 'Option 2', 'Option 3']} placeholder="Select an shift" />
    ),
  },
  {
    title: <HeaderCell title="T5" />,
    dataIndex: 'thu',
    key: 'thu',
    width: 100,
    render: (_: string, staff: Staff) => (
      <CustomSelect options={['Option 1', 'Option 2', 'Option 3']} placeholder="Select an shift" />
    ),
  },
  {
    title: <HeaderCell title="T6" />,
    dataIndex: 'fri',
    key: 'fri',
    width: 100,
    render: (_: string, staff: Staff) => (
      <CustomSelect options={['Option 1', 'Option 2', 'Option 3']} placeholder="Select an shift" />
    ),
  },
  {
    title: <HeaderCell title="T7" />,
    dataIndex: 'sat',
    key: 'sat',
    width: 100,
    render: (_: string, staff: Staff) => (
      <CustomSelect options={['Option 1', 'Option 2', 'Option 3']} placeholder="Select an shift" />
    ),
  },
  {
    title: <HeaderCell title="CN" />,
    dataIndex: 'sun',
    key: 'sun',
    width: 100,
    render: (_: string, staff: Staff) => (
      <CustomSelect options={['Option 1', 'Option 2', 'Option 3']} placeholder="Select an shift" />
    ),
  },
];

export interface Staff {
  active: string;
  name: string;
  phone: string;
  image: string;
  idcard: string;
  birthday: string;
  status: any;
  address: string;
  position: {
    name: string;
    active: string;
  };
  created_at: string;
}
export interface ShiftDetail {
  shift_id: string;
}
export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
