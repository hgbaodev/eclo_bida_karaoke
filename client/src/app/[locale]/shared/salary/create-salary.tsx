'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { CreateSalaryInput, createSalarySchema } from '@/utils/validators/salary/create-salary.schema';
import { createSalary, getSalaries } from '@/store/slices/salarySlice';

export default function CreateSalary() {
  const monthOptions = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 17 }, (_, index) => ({
    value: currentYear + index,
    label: `${currentYear + index}`,
  }));
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { isCreateLoading, month, year } = useSelector((state: RootState) => state.salary);
  const onSubmit: SubmitHandler<CreateSalaryInput> = async (data) => {
    const result: any = await dispatch(createSalary(data));

    if (createSalary.fulfilled.match(result)) {
      toast.success('Salary created successfully');
      dispatch(getSalaries({ month, year, query: '' }));
      closeModal();
    } else {
      setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form<CreateSalaryInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createSalarySchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Create Salary For Staff
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Controller
              name="month"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={monthOptions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Month"
                  placeholder="Select a month"
                  className="col-span-full"
                  error={errors?.month?.message}
                  getOptionValue={(option) => option.value}
                  getOptionDisplayValue={(option) => option.label}
                  displayValue={(selected: number) =>
                    monthOptions.find((option) => option.value === selected)?.label ?? selected
                  }
                  dropdownClassName="!z-[1] h-[130px] overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  inPortal={false}
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={yearOptions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Year"
                  placeholder="Select a year"
                  className="col-span-full"
                  error={errors?.month?.message}
                  getOptionValue={(option) => option.value}
                  getOptionDisplayValue={(option) => option.label}
                  displayValue={(selected: number) =>
                    yearOptions.find((option) => option.value === selected)?.label ?? selected
                  }
                  dropdownClassName="!z-[1] h-[130px]"
                  inPortal={false}
                />
              )}
            />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Create Salaries
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
