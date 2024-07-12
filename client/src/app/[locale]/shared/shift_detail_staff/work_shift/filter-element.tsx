'use client';

import { PiTrashDuotone } from 'react-icons/pi';
import StatusField from '@/components/controlled-table/status-field';
import { Button, Input } from 'rizzui';
import { dispatch } from '@/store';
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';

import { setReset, setWorkShift } from '@/store/slices/shift_user_detailSlice';
import { useTranslations } from 'next-intl';
export default function FilterElement() {
  const t = useTranslations('shift_for_staff');
  const { data } = useSelector((state: RootState) => state.work_shift);
  const { workshift, isFiltered } = useSelector((state: RootState) => state.shift_user_detail);

  return (
    <>
      <div className="relative z-50 mb-4 flex flex-wrap items-center justify-between gap-2.5 @container ">
        <StatusField
          options={data}
          dropdownClassName="!z-10 w-48"
          value={workshift}
          placeholder={t('filter-workshift')}
          className=" @4xl:-auto -order-3 w-full min-w-[230px] @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-4 @4xl:w-auto"
          getOptionValue={(option) => option.active}
          getOptionDisplayValue={(option) => option.date_start + '->' + option.date_end}
          onChange={(value: any) => {
            dispatch(setWorkShift(value));
          }}
          displayValue={(selected: string) =>
            data.find((workshift) => workshift.active === selected)?.date_start +
              '->' +
              data.find((workshift) => workshift.active === selected)?.date_end || selected
          }
        />
      </div>
    </>
  );
}
