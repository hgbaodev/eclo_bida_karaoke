'use client';

import { CiEdit } from 'react-icons/ci';
import { IoAddCircleOutline } from 'react-icons/io5';
import StatusField from '@/components/controlled-table/status-field';
import { Button, Input } from 'rizzui';
import { dispatch } from '@/store';
import { RootState } from '@/store/types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useModal } from '../../modal-views/use-modal';
import CreateArea from '../create-area';
import { getAreas } from '@/store/slices/areaSlice';
import EditArea from '../edit-area';
import { setQuery, setSelectedArea } from '@/store/slices/serviceSlice';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import useDebounce from '@/hooks/use-debounce';

export default function FilterElement() {
  const { openModal } = useModal();
  const { data } = useSelector((state: RootState) => state.area);
  const { selectedArea, query } = useSelector((state: RootState) => state.service);
  const [searchTerm, setSearchTerm] = useState(query);
  const debounceSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    dispatch(getAreas());
  }, []);

  useEffect(() => {
    dispatch(setQuery(debounceSearchTerm));
  }, [debounceSearchTerm]);

  return (
    <>
      <div className="relative z-50 mb-4 flex flex-wrap items-center gap-2.5 @container ">
        <StatusField
          className=" -order-9 w-full @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] @4xl:-order-5 @4xl:w-[calc(calc(100%_-_10px)_/_4)]"
          options={[
            {
              active: '',
              name: 'All',
            },
            ...data,
          ]}
          dropdownClassName="!z-10"
          value={selectedArea}
          onChange={(active: any) => {
            dispatch(setSelectedArea(active));
          }}
          placeholder="All areas"
          getOptionValue={(option) => option.active}
          getOptionDisplayValue={(option) => option.name}
          displayValue={(selected: string) =>
            [
              {
                active: '',
                name: 'All',
              },
              ...data,
            ].find((area) => area.active === selected)?.name || selected
          }
        />
        {selectedArea.length > 0 ? (
          <Button
            size="sm"
            onClick={() => {
              const findArea = data.find((area) => area.active == selectedArea);
              openModal({
                view: <EditArea active={findArea.active} description={findArea.description} name={findArea.name} />,
              });
            }}
            className="-order-9 @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] w-full bg-gray-200/70 @4xl:-order-5 @4xl:w-auto"
            variant="flat"
          >
            <CiEdit className="me-1.5 h-[17px] w-[17px]" /> Edit
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => {
              openModal({
                view: <CreateArea />,
              });
            }}
            className="-order-9 @[25rem]:w-[calc(calc(100%_-_10px)_/_2)] w-full bg-gray-200/70 @4xl:-order-5 @4xl:w-auto"
            variant="flat"
          >
            <IoAddCircleOutline className="me-1.5 h-[17px] w-[17px]" /> Add
          </Button>
        )}
        <Input
          type="search"
          placeholder="Search for table/rooms..."
          value={searchTerm}
          onClear={() => setSearchTerm('')}
          onChange={(event) => setSearchTerm(event.target.value)}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          rounded="lg"
          clearable
          className="-order-2 w-full @xl:-order-5 @xl:ms-auto @xl:w-full @4xl:-order-2 @4xl:w-[230px] @5xl:w-auto"
        />
      </div>
    </>
  );
}
