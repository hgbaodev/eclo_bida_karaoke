import { RootState } from '@/store/types';
import React from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Button, Input, Select, Title } from 'rizzui';

const ListDevices = () => {
  const { listDevices } = useSelector((state: RootState) => state.service);
  return (
    <>
      <div className="col-span-full">
        <div className="row flex justify-between">
          <Title as="h5">List device</Title>
          <Button variant="outline">Add</Button>
        </div>
      </div>
    </>
  );
};

export default ListDevices;

const AddDevice = () => {
  return (
    <div className="col-span-full">
      <div className="row ">
        <div className="flex flex-row space-x-4">
          <div className="basis-1/2">
            <Select
              options={[
                {
                  label: 'Tivi',
                  value: 'Tivi',
                },
                {
                  label: 'Micro',
                  value: 'Micro',
                },
              ]}
              label="Device"
              placeholder="Select a price"
              className="col-span-[1/3]"
              dropdownClassName="!z-[1]"
              inPortal={false}
            />
          </div>
          <div className="basis-1/2">
            <Input label="Number" className="col-span-[1/3]" />
          </div>
          <div className="basis-1/4 flex items-end">
            <Button size="sm" className="col-span-[1]" variant="flat">
              <CiCircleRemove className="h-[30px] w-[30px] p-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
