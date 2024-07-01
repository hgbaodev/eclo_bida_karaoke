'use client';

import AvatarCard from '@/components/ui/avatar-card';
import env from '@/env';
import React, { useEffect, useRef } from 'react';
import { Button, Input, Loader, Popover } from 'rizzui';
import { RiFinderFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getCustomer, setCustomer, setCustomers, setQueryCustomer } from '@/store/slices/orderSlice';
import { dispatch } from '@/store';
import useDebounce from '@/hooks/use-debounce';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { MdOutlineFindInPage } from 'react-icons/md';

const SearchCustomer = () => {
  const { queryCustomer, isLoadingQueryCustomer, customers } = useSelector((state: RootState) => state.order);
  const searchCustomer = useDebounce(queryCustomer, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchCustomer) {
      dispatch(getCustomer(searchCustomer));
    } else {
      dispatch(setCustomers([]));
    }
  }, [searchCustomer]);

  return (
    <Popover showArrow={false}>
      <Popover.Trigger>
        <Input
          ref={inputRef}
          value={queryCustomer}
          onChange={(event) => dispatch(setQueryCustomer(event.target.value))}
          placeholder="Search customer ....."
          prefix={<PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />}
          suffix={
            queryCustomer && (
              <Button
                size="sm"
                variant="text"
                className="h-auto w-auto px-0"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setCustomer(null));
                  dispatch(setQueryCustomer(''));
                }}
              >
                X
              </Button>
            )
          }
        />
      </Popover.Trigger>
      <Popover.Content>
        {({ setOpen }) => (
          <div className="w-[550px] h-[200px] mt-2 overflow-y-scroll">
            <div className="flex flex-col justify-center space-y-2">
              {isLoadingQueryCustomer ? (
                <div className="flex justify-center items-center">
                  <Loader variant="threeDot" size="xl" color="info" />
                </div>
              ) : queryCustomer.length == 0 ? (
                <div className="h-100px flex flex-col items-center justify-center">
                  <MdOutlineFindInPage className="w-10 h-10" />
                  <span className="text-gray-400 mt-2">Please enter name cusomter</span>
                </div>
              ) : customers.length == 0 ? (
                <div className="h-100px flex flex-col items-center justify-center">
                  <RiFinderFill className="w-10 h-10" />
                  <span className="text-gray-400">No customer found</span>
                </div>
              ) : (
                <>
                  {customers.map((customer: Customer) => (
                    <div
                      key={customer?.active}
                      className="flex justify-between items-center space-x-2 cursor-pointer rounded p-2 hover:bg-gray-100"
                      onClick={() => {
                        dispatch(setCustomer(customer));
                        dispatch(setQueryCustomer(customer.first_name + ' ' + customer.last_name));
                        setOpen(false);
                      }}
                    >
                      <AvatarCard
                        src={env.API_STORAGE + customer.image}
                        avatarProps={{
                          name: '',
                          size: 'lg',
                          className: 'rounded-lg',
                        }}
                        name={customer.first_name + ' ' + customer.last_name}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
};

export default SearchCustomer;

interface Customer {
  first_name: string;
  last_name: string;
  status: string;
  image: null;
  active: string;
  phone: string;
  email: string;
}
