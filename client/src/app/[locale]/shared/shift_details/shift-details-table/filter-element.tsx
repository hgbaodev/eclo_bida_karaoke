'use client';

import { PiTrashDuotone, PiMagnifyingGlassBold } from 'react-icons/pi';
import StatusField from '@/components/controlled-table/status-field';
import { Button, Input } from 'rizzui';
import { dispatch } from '@/store';
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { DayOfWeekOptions } from '../type';
import { getShifts } from '@/store/slices/shiftSlice';
import { setShift, setQuery, setReset, setDayOfWeek } from '@/store/slices/shift_detailSlice';

export default function FilterElement() {
  const { isFiltered, query, shift, day_of_week } = useSelector((state: RootState) => state.shift_detail);
  const { listShifts } = useSelector((state: RootState) => state.shift);
  const [searchTerm, setSearchTerm] = useState(query);
  const debounceSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    dispatch(setQuery(debounceSearchTerm));
  }, [debounceSearchTerm]);

  useEffect(() => {
    dispatch(getShifts());
  }, []);

  return (
    <>
      <div className="relative z-50 mb-4 flex flex-wrap items-center justify-between gap-2.5 @container ">
        <StatusField
          className=" -order-9 w-full @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-5 @4xl:w-auto"
          options={DayOfWeekOptions}
          dropdownClassName="!z-10"
          value={day_of_week}
          onChange={(value: any) => {
            dispatch(setDayOfWeek(value));
          }}
          placeholder="Filter by Day of week"
          getOptionValue={(option: { value: any }) => option.value}
          getOptionDisplayValue={(option: { value: any }) => option.value}
          displayValue={(selected: any) => selected}
        />
        <StatusField
          options={listShifts}
          dropdownClassName="!z-10 w-48"
          value={shift}
          placeholder="Filter by Shift"
          className=" @4xl:-auto -order-3 w-full min-w-[200px] @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-4 @4xl:w-auto"
          getOptionValue={(option) => option.active}
          getOptionDisplayValue={(option) => option.time_in + '-' + option.time_out}
          onChange={(value: any) => {
            dispatch(setShift(value));
          }}
          displayValue={(selected: string) =>
            listShifts.find((shift) => shift.active === selected)?.time_in +
              '-' +
              listShifts.find((shift) => shift.active === selected)?.time_out || selected
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
          placeholder="Search for shift detail..."
          value={searchTerm}
          onClear={() => setSearchTerm('')}
          onChange={(event) => setSearchTerm(event.target.value)}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          rounded="lg"
          clearable
          className="-order-2 w-full @xl:-order-5 @xl:ms-auto @xl:w-auto @4xl:-order-2 @4xl:w-[230px] @5xl:w-auto"
        />
      </div>
    </>
  );
}
