'use client';

import { PiTrashDuotone, PiMagnifyingGlassBold } from 'react-icons/pi';
import StatusField from '@/components/controlled-table/status-field';
import { Button, Input } from 'rizzui';
import { dispatch } from '@/store';
import { setQuery, setReset, setType } from '@/store/slices/productSlices';
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { getProductType } from '@/store/slices/product_typeSlices';

// import { getPositions } from '@/store/slices/positionSlice';

export default function FilterElement() {
  const { isFiltered, query,type} = useSelector((state: RootState) => state.product);
  const [searchTerm, setSearchTerm] = useState(query);
  const debounceSearchTerm = useDebounce(searchTerm, 1000);
  const { listType } = useSelector((state: RootState) => state.product_type);
  useEffect(() => {
    dispatch(setQuery(debounceSearchTerm));
  }, [debounceSearchTerm]);
 
  useEffect(() => {
    dispatch(getProductType());
  }, []);
  console.log(listType);
  return (
    <>
      <div className="relative z-50 mb-4 flex flex-wrap items-center justify-between gap-2.5 @container ">
        <StatusField
          options={listType}
          dropdownClassName="!z-10 w-48"
          value={type}
          placeholder="Filter by Product Type"
          className=" @4xl:-auto -order-3 w-full min-w-[160px] @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-4 @4xl:w-auto"
          getOptionValue={(option) => option.active}
          getOptionDisplayValue={(option) => option.type_name}
          onChange={(value: any) => {
            dispatch(setType(value));
          }}
          displayValue={(selected: string) => listType.find((type) => type.active === selected)?.type_name || selected}
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
          placeholder="Search for product..."
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
