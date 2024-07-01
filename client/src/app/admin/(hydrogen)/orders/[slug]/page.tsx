'use client';

import { useModal } from '@/app/shared/modal-views/use-modal';
import PayOrder from '@/app/shared/orders/modal/pay_order';
import SearchCustomer from '@/app/shared/orders/search_customer';
import SearchProduct from '@/app/shared/orders/search_product';
import TableOrder from '@/app/shared/orders/table_order';
import PageHeader from '@/app/shared/page-header';
import { dispatch } from '@/store';
import { getOrder, updateOrder } from '@/store/slices/orderSlice';
import { RootState } from '@/store/types';
import { formatDate } from '@/utils/format-date';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Button, Loader, Text, Title } from 'rizzui';

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
  const { order, isLoadingGetOrder, isLoadingUpdateOrder } = useSelector((state: RootState) => state.order);
  const { openModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    dispatch(getOrder(params.slug));
  }, [params]);

  const handlePay = () => {
    openModal({ view: <PayOrder />, customSize: '660px' });
  };

  const handleUpdate = async () => {
    const value = {
      order_active: order?.active,
      products: order?.products,
      customer_active: order?.customer?.active,
    };

    const result = await dispatch(updateOrder(value));
    if (updateOrder.fulfilled.match(result)) {
      toast.success('Update success');
      router.push('/admin/orders/tableandrooms');
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="grid  grid-cols-1 lg:grid-cols-2 lg:space-x-4 space-y-4">
        <div className="mt-[18px]">
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
            <div className="flex justify-center items-center h-[100px]">
              <Loader variant="spinner" size="xl" color="info" />
            </div>
          ) : (
            <>
              <SearchCustomer />
              <Text className="mt-4">
                Full name: {order?.customer != null ? order?.customer.first_name + ' ' + order?.customer.last_name : ''}
              </Text>
              <Text className="mt-2">Phone: {order?.customer?.phone}</Text>
              <Text className="mt-2">Email: {order?.customer?.email}</Text>
              <Title as="h5" className="mt-4">
                Invoice information
              </Title>
              <Text className="mt-1">Code Invoice: {params.slug}</Text>
              <Text className="mt-1">Service: {order?.service?.name}</Text>
              <Text className="mt-1">Price: {order?.service?.price?.pricePerHour}$/ 1 Hours</Text>
              <Text className="mt-1">
                Check in: {formatDate(new Date(order?.checkin_time ?? ''), 'DD/MM/YYYY, hh:mm:ss')}
              </Text>
              <div className="mt-[100px] space-x-3 flex justify-end">
                <Button onClick={handleUpdate} isLoading={isLoadingUpdateOrder} className="w-[80px]" color="primary">
                  Update
                </Button>
                <Button onClick={handlePay} className="w-[80px]" color="danger">
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
