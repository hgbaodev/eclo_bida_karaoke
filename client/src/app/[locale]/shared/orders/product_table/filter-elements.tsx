'use client';

import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { dispatch } from '@/store';
import { setQuery } from '@/store/slices/productSlices';
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { Input } from 'rizzui';

export default function FilterElement() {
  const { query } = useSelector((state: RootState) => state.product);
  const [searchTerm, setSearchTerm] = useState(query);
  const debounceSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    dispatch(setQuery(debounceSearchTerm));
  }, [debounceSearchTerm]);

  return (
    <>
      <div className="relative z-50 mb-4 flex flex-wrap items-center gap-2.5 @container ">
        <Input
          type="search"
          placeholder="Search for product..."
          value={searchTerm}
          onClear={() => setSearchTerm('')}
          onChange={(event: any) => setSearchTerm(event.target.value)}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          rounded="lg"
          clearable
          className="w-full"
        />
      </div>
    </>
  );
}
