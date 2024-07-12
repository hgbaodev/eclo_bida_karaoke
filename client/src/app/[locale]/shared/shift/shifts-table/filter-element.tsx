'use client';

import { PiTrashDuotone, PiMagnifyingGlassBold } from 'react-icons/pi';
import StatusField from '@/components/controlled-table/status-field';
import { Button, Input } from 'rizzui';
import { dispatch } from '@/store';
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { shiftTypeOptions, statusOptions } from '../type';
import { getShiftTypeBadge, getStatusBadge } from './colunms';
import { setQuery, setReset, setShiftType, setStatus } from '@/store/slices/shiftSlice';
import { useTranslations } from 'next-intl';
export default function FilterElement() {
  const t = useTranslations('shift');
  const { isFiltered, query, status, shift_type } = useSelector((state: RootState) => state.shift);
  const [searchTerm, setSearchTerm] = useState(query);
  const debounceSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    dispatch(setQuery(debounceSearchTerm));
  }, [debounceSearchTerm]);

  return (
    <>
      <div className="relative z-50 mb-4 flex flex-wrap items-center justify-between gap-2.5 @container ">
        <StatusField
          className=" -order-9 w-full @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-5 @4xl:w-auto"
          options={statusOptions}
          dropdownClassName="!z-10"
          value={status}
          onChange={(value: any) => {
            dispatch(setStatus(value));
          }}
          placeholder={t('filter_status')}
          getOptionValue={(option: { value: any }) => option.value}
          getOptionDisplayValue={(option: { value: any }) => getStatusBadge(option.value as any, t)}
          displayValue={(selected: any) => getStatusBadge(selected, t)}
        />
        <StatusField
          className=" -order-9 w-full @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-5 @4xl:w-auto"
          options={shiftTypeOptions}
          dropdownClassName="!z-10"
          value={shift_type}
          onChange={(value: any) => {
            dispatch(setShiftType(value));
          }}
          placeholder={t('filter_shifttype')}
          getOptionValue={(option: { value: any }) => option.value}
          getOptionDisplayValue={(option: { value: any }) => getShiftTypeBadge(option.value as any)}
          displayValue={(selected: any) => getShiftTypeBadge(selected)}
        />

        {isFiltered && (
          <Button
            size="sm"
            onClick={() => dispatch(setReset())}
            className="-order-1 h-8 w-full bg-gray-200/70 @4xl:-order-4 @4xl:w-auto"
            variant="flat"
          >
            <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> {t('clear')}
          </Button>
        )}

        <Input
          type="search"
          placeholder={t('search')}
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
