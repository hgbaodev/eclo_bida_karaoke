'use client';

import { PiTrashDuotone, PiMagnifyingGlassBold } from 'react-icons/pi';
import StatusField from '@/components/controlled-table/status-field';
import { Button, Input } from 'rizzui';
import { dispatch } from '@/store';
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { setMonth, setYear, setQuery } from '@/store/slices/salarySlice';

export default function FilterElement() {
  const { month, year } = useSelector((state: RootState) => state.salary);
  const { query } = useSelector((state: RootState) => state.staff);
  const [searchTerm, setSearchTerm] = useState(query);
  const debounceSearchTerm = useDebounce(searchTerm, 1000);
  useEffect(() => {
    dispatch(setQuery(debounceSearchTerm));
  }, [debounceSearchTerm]);
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
  return (
    <>
      <div className="relative z-50 mb-4 flex flex-wrap items-center justify-between gap-2.5 @container ">
        <StatusField
          className=" -order-9 w-full @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-5 @4xl:w-auto"
          options={monthOptions}
          dropdownClassName="!z-10"
          value={month}
          onChange={(value: any) => {
            dispatch(setMonth(value));
          }}
          placeholder="Filter by Status"
          getOptionValue={(option) => option.value}
          getOptionDisplayValue={(option) => option.label}
          displayValue={(selected: any) => monthOptions.find((option) => option.value === selected)?.label || selected}
        />
        <StatusField
          className=" -order-9 w-full @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-5 @4xl:w-auto"
          options={yearOptions}
          dropdownClassName="!z-10"
          value={year}
          onChange={(value) => {
            dispatch(setYear(value));
          }}
          placeholder="Filter by Year"
          getOptionValue={(option) => option.value}
          getOptionDisplayValue={(option) => option.label}
          displayValue={(selected: any) => yearOptions.find((option) => option.value === selected)?.label || selected}
        />

        <Input
          type="search"
          placeholder="Search for staffs..."
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
