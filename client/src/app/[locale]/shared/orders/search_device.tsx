'use client';

import AvatarCard from '@/components/ui/avatar-card';
import env from '@/env';
import React, { useEffect } from 'react';
import { ActionIcon, Input, Popover } from 'rizzui';
import { IoMdAdd } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getDevicesByService, setAddDevice } from '@/store/slices/orderSlice';
import { dispatch } from '@/store';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

const SearchDevice = () => {
  const t = useTranslations('order');
  const { order, devices } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getDevicesByService(order?.service.active ?? ''));
  }, [order]);

  return (
    <Popover showArrow={false}>
      <Popover.Trigger>
        <Input
          placeholder={t('search_devices')}
          prefix={<PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />}
        />
      </Popover.Trigger>
      <Popover.Content>
        {({ setOpen }) => (
          <div className="w-[550px] mt-2">
            <div className="flex flex-col justify-center space-y-2">
              {devices.map(
                (device: {
                  active: string;
                  status: string;
                  service_name: string;
                  service_active: string;
                  device_name: string;
                  device_image: string;
                  device_active: string;
                  quantity: number;
                  device_value: number;
                  maintaining_quantity: number;
                }) => (
                  <div
                    key={device?.active}
                    className="flex justify-between items-center space-x-2 cursor-pointer rounded"
                  >
                    <AvatarCard
                      src={env.API_STORAGE + device.device_image}
                      avatarProps={{
                        name: '',
                        size: 'lg',
                        className: 'rounded-lg',
                      }}
                      name={device.device_name + `(${device.quantity})`}
                    />
                    <ActionIcon
                      onClick={() => {
                        if (device.quantity == 0) {
                          toast.error(t('out_of_stock'));
                          return;
                        }
                        const value = {
                          active: device.device_active,
                          name: device.device_name,
                          image: device.device_image,
                          quantity: 1,
                          selling_price: device.device_value,
                          quantity_stock: device.quantity,
                        };
                        dispatch(setAddDevice(value));
                        setOpen(false);
                      }}
                      as="span"
                      size="sm"
                      variant="outline"
                      className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
                    >
                      <IoMdAdd className="h-4 w-4" />
                    </ActionIcon>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
};

export default SearchDevice;
