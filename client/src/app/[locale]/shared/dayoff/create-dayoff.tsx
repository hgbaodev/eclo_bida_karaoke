'use client';
import { useEffect, useState } from 'react';
// import Select, { StylesConfig } from 'react-select';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import Select1, { StylesConfig } from 'react-select';

import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { statusOptions } from '../attendance/type';
import { getStatusBadge } from '../attendance/colunm';
import { createDayOffSchema, CreateDayOffInput } from '@/utils/validators/dayoff/create-dayoff-schema';
import { createDayoff, getDayoffs } from '@/store/slices/dayoffSlice';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { OptionType } from 'dayjs';
import { getAttendances, updateAttendance } from '@/store/slices/attendanceSlice';

export default function CreateDayOff() {
  const t = useTranslations('dayoff');
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});

  const { pageSize, page, query, isCreateLoading,type } = useSelector((state: RootState) => state.dayoff);

  const { month, year } = useSelector((state: RootState) => state.attendance);

  const { listStaffs } = useSelector((state: RootState) => state.staff);
  const onSubmit: SubmitHandler<CreateDayOffInput> = async (data) => {
    const result: any = await dispatch(createDayoff(data));
    const dataAttendance = {
      staff: data.staff,
      day: data.day_off,
      time: '',
      check_in: '',
      check_out: '',
      day_off: data.type === 'A' ? true : false,
    };
    if (createDayoff.fulfilled.match(result)) {
      dispatch(updateAttendance(dataAttendance));
      setReset({
        staff: '',
        type: '',
        reason: '',
        day_off: '',
      });
      setErrors({});
      closeModal();

      await dispatch(getDayoffs({ page, pageSize, query,type }));

      dispatch(getAttendances({ month, year }));

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
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('add_dayoff')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            {/* <Input label="Staff ID" placeholder="Enter staff id" className="col-span-full"
            error={errors.staff_id?.message}
            {...register('staff_id')}
            
            /> */}
            <Controller
              name="staff"
              control={control}
              render={({ field }) => (
                <>
                  <Select1
                    options={listStaffs}
                    value={listStaffs.find((option) => option.active === field.value)}
                    onChange={(option) => field.onChange(option.active)}
                    name={field.name}
                    className="col-span-full"
                    placeholder= {t('select_staff')}
                    isSearchable
                    styles={customStyles}
                    getOptionValue={(option) => option.active}
                    getOptionLabel={(option) => `${option.last_name} ${option.first_name} - ${option.uuid}`}
                    aria-invalid={errors.staff ? 'true' : 'false'}
                  />
                  {errors.staff && <span className="error-message">{errors.staff.message}</span>}
                </>
              )}
            />
            <Input label={t('reason')} placeholder={t('reason_input')}className="col-span-full" {...register('reason')} />

            <Input
              type="date"
              label= {t('day_off')}
              placeholder= {t('day_off')}
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
                  label={t('type')}
                  placeholder={t('select_status')}
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
              {t('cancel')}
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
              {t('btn_add')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
const customStyles: StylesConfig<OptionType, boolean> = {
  menu: (provided, state) => ({
    ...provided,
    zIndex: 9999,
    position: 'absolute',
    maxHeight: '300px',
    marginTop: '-1px',
    background: 'white',
  }),
};
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
