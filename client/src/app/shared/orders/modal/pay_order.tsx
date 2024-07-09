'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Button, ActionIcon, Title, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import TableOrder from './table_order';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import dayjs from 'dayjs';
import { dispatch } from '@/store';
import { payOrder } from '@/store/slices/orderSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PayOrder() {
  const router = useRouter();
  const { closeModal } = useModal();
  const { order, isLoadingPayOrder, isView } = useSelector((state: RootState) => state.order);
  const checkOutTime = dayjs(order?.checkout_time == null ? new Date() : order.checkout_time).format(
    'YYYY-MM-DD HH:mm:ss',
  );
  const hoursDiff = parseFloat(
    (
      dayjs(order?.checkout_time == null ? new Date() : order.checkout_time).diff(
        dayjs(order?.checkin_time),
        'minute',
      ) / 60
    ).toFixed(2),
  );
  const totalPriceProduct = order?.products.reduce((acc, cur) => acc + cur.selling_price * cur.quantity, 0);
  const totalPriceService = hoursDiff * (order?.service.price.pricePerHour ?? 0);
  const totalDevices = order?.devices.reduce((acc, cur) => acc + cur.quantity * cur.selling_price, 0) ?? 0;
  const totalEnd =
    totalPriceProduct == undefined ? totalPriceService : totalPriceProduct + totalPriceService + totalDevices;
  return (
    <Form
      onSubmit={async () => {
        const value = {
          order_active: order?.active,
          total_price: totalEnd,
          checkout_time: checkOutTime,
          products: order?.products,
          devices: order?.devices,
          customer_active: order?.customer?.active,
        };

        const result = await dispatch(payOrder(value));
        if (payOrder.fulfilled.match(result)) {
          closeModal();
          router.push('/admin/orders/tableandrooms');
          toast.success('Payment success');
        }
      }}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold text-center">
                Infomation Order
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="col-span-full">
              <div className="flex">
                <div className="flex flex-col w-[50%] justify-center items-center space-y-2">
                  <Text as="b">BILLIARDS CUP NEW ECLO</Text>
                  <Text as="em">VietNamese</Text>
                  <Text as="em">0355374322</Text>
                </div>
                <div className="flex flex-col w-[50%]">
                  <div className="flex w-full text-center justify-normal">
                    <Text as="b">ORDER TABLE 10</Text>
                  </div>
                  <div className="flex">
                    <Text className="w-[100px]">Time start:</Text>
                    <Text>{dayjs(order?.checkin_time).format('HH:mm DD/MM/YYYY')}</Text>
                  </div>
                  <div className="flex">
                    <Text className="w-[100px]">Time end:</Text>
                    <Text>
                      {dayjs(order?.checkout_time == null ? new Date() : order.checkout_time).format(
                        'HH:mm DD/MM/YYYY',
                      )}
                    </Text>
                  </div>
                  <div className="flex">
                    <Text className="w-[100px]">Time used:</Text>
                    <Text>{hoursDiff} Hour</Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <TableOrder />
            </div>
            <div className="col-span-full">
              {/* <div className="w-[250px]"> */}
              <div className="flex">
                <Text as="b" className="w-[150px]">
                  Price:
                </Text>
                <Text>{order?.service.price.pricePerHour}$ / 1 Hour</Text>
              </div>
              <div className="flex mt-3 text-red-500">
                <Text as="b" className="w-[150px]">
                  Total dervices:
                </Text>
                <Text>{totalDevices} $</Text>
              </div>
              <div className="flex mt-3">
                <Text as="b" className="w-[150px]">
                  Total Product:
                </Text>
                <Text>{totalPriceProduct} $</Text>
              </div>
              <div className="flex mt-3">
                <Text as="b" className="w-[150px]">
                  Total Service:
                </Text>
                <Text>{totalPriceService} $</Text>
              </div>
              <div className="flex mt-3">
                <Text as="b" className="w-[150px]">
                  Total Price:
                </Text>
                <Text>{totalEnd} $</Text>
              </div>
            </div>
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              {!isView && (
                <Button type="submit" isLoading={isLoadingPayOrder} className="w-full @xl:w-auto">
                  Confirm
                </Button>
              )}
            </div>
          </>
        );
      }}
    </Form>
  );
}
