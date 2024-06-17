'use client';

import { PiTrashDuotone } from 'react-icons/pi';
import StatusField from '@/components/controlled-table/status-field';
import { Button, Input } from 'rizzui';
import { dispatch } from '@/store';
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';

import { setReset, setWorkShift } from '@/store/slices/shift_user_detailSlice';

export default function FilterElement() {
  const { data } = useSelector((state: RootState) => state.work_shift);
  const { workshift, isFiltered } = useSelector((state: RootState) => state.shift_user_detail);

  return (
    <>
      <div className="relative z-50 mb-4 flex flex-wrap items-center justify-between gap-2.5 @container ">
        <StatusField
          options={data}
          dropdownClassName="!z-10 w-48"
          value={workshift}
          placeholder="Filter by Work Shift"
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

        {isFiltered && (
          <Button
            size="sm"
            onClick={() => dispatch(setReset())}
            className="-order-1 h-8 w-full bg-gray-200/70 @4xl:-order-4 @4xl:w-auto"
            variant="flat"
          >
            <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
          </Button>
        )}
        <Input
          type="search"
          placeholder="Search for staffs..."
          rounded="lg"
          clearable
          className="-order-2 w-full @xl:-order-5 @xl:ms-auto @xl:w-auto @4xl:-order-2 @4xl:w-[230px] @5xl:w-auto"
        />
      </div>
    </>
  );
}
