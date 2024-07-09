'use client';
import { useEffect, useState } from 'react';
// import Select, { StylesConfig } from 'react-select';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { statusOptions } from '../attendance/type';
import { getStatusBadge } from '../attendance/colunm';
import { createDayOffSchema, CreateDayOffInput } from '@/utils/validators/dayoff/create-dayoff-schema';
import { createDayoff, getDayoffs } from '@/store/slices/dayoffSlice';
import toast from 'react-hot-toast';
import { OptionType } from 'dayjs';
import { updateAttendance } from '@/store/slices/attendanceSlice';

export default function CreateDayOff() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isCreateLoading } = useSelector((state: RootState) => state.dayoff);
  const onSubmit: SubmitHandler<CreateDayOffInput> = async (data) => {
    const result: any = await dispatch(createDayoff(data));
    const editAttendance = {
      uuid: data.staff_id,
      day: data.day_off,
      time: '',
      check_in: '',
      check_out: '',
      day_off: data.type == 'A' ? true : false,
    };
    dispatch(updateAttendance(editAttendance));
    if (createDayoff.fulfilled.match(result)) {
      setReset({
        staff_id: '',
        type: '',
        reason: '',
        day_off: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getDayoffs({ page, pageSize, query }));
      toast.success('Created successfully');
    } else {
      setErrors(result?.payload?.errors);
      toast.error(result.payload.errors);
      closeModal();
    }
  };
  return (
    <Form<CreateDayOffInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createDayOffSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log(errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Day Off
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Staff ID"
              placeholder="Enter staff id"
              className="col-span-full"
              error={errors.staff_id?.message}
              {...register('staff_id')}
            />
            <Input label="Reason" placeholder="Reason for day off" className="col-span-full" {...register('reason')} />

            <Input
              type="date"
              label="Day off"
              placeholder="Enter day off"
              className="col-span-full"
              {...register('day_off')}
              error={errors.day_off?.message}
            />
            <Controller
              name="type"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  value={value}
                  options={statusOptions}
                  onChange={onChange}
                  name={name}
                  label="Status"
                  placeholder="Select a status"
                  className="col-span-full"
                  error={errors?.type?.message}
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
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Add
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}

// const customStyles: StylesConfig<OptionType, boolean> = {
//   menu: (provided, state) => ({
//     ...provided,
//     zIndex: 9999,
//     position: 'absolute',
//     maxHeight: '300px',
//     marginTop: '-1px',
//     background: 'white',
//   }),
// };

// const App = () => {
//   const [currentTime, setCurrentTime] = useState('');

//   useEffect(() => {
//     const now = new Date();
//     const hours = now.getHours().toString().padStart(2, '0');
//     const minutes = now.getMinutes().toString().padStart(2, '0');
//     setCurrentTime(`${hours}:${minutes}`);
//   }, []);

//   return <Input type="time" label="Time" className="col-span-[1/2]" value={currentTime} readOnly />;
// };
