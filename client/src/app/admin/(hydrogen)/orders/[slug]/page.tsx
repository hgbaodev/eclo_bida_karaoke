'use client';
import SearchProduct from '@/app/shared/orders/search_product';
import TableOrder from '@/app/shared/orders/table_order';
import PageHeader from '@/app/shared/page-header';
import { dispatch } from '@/store';
import { getOrder } from '@/store/slices/orderSlice';
import { RootState } from '@/store/types';
import { formatDate } from '@/utils/format-date';
import { use, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Popover, Text, Title } from 'rizzui';

const pageHeader = {
  title: 'Order',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Order',
    },
  ],
};

export default function BlankPage({ params }: { params: { slug: string } }) {
  const { order, isLoadingGetOrder } = useSelector((state: RootState) => state.order);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getOrder(params.slug));
  }, [params]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="grid  grid-cols-1 lg:grid-cols-2 space-x-4 space-y-4">
        <div className="mt-[20px]">
          <SearchProduct />
          <div className="flex flex-col">
            <Title as="h5" className="my-3">
              Product list
            </Title>
            <TableOrder />
          </div>
        </div>
        <div>
          {isLoadingGetOrder ? (
            <>Loading.............</>
          ) : (
            <>
              <Title as="h5">Customer information</Title>
              <Input ref={inputRef} placeholder="Search customer ....." />
              <Text>Full name: {order?.customer?.first_name + ' ' + order?.customer?.last_name}</Text>
              <Text>Phone: {order?.customer?.phone}</Text>
              <Title as="h5">Invoice information</Title>
              <Text>Code Invoice: {params.slug}</Text>
              <Text>Service: {order?.service?.name}</Text>
              <Text>Price: {order?.service?.price?.pricePerHour}$/ 1 Hours</Text>
              <Text>Check in: {formatDate(new Date(order?.checkin_time ?? ''), 'DD/MM/YYYY, hh:mm:ss')}</Text>
              <div className="mt-[100px] space-x-3 flex justify-end">
                <Button className="w-[80px]" color="primary">
                  Update
                </Button>
                <Button className="w-[80px]" color="danger">
                  Pay
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
