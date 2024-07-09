'use client';

import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import TableDeviceOrder from '@/app/[locale]/shared/orders/device_order';
import PayOrder from '@/app/[locale]/shared/orders/modal/pay_order';
import SearchCustomer from '@/app/[locale]/shared/orders/search_customer';
import SearchDevice from '@/app/[locale]/shared/orders/search_device';
import SearchProduct from '@/app/[locale]/shared/orders/search_product';
import TableOrder from '@/app/[locale]/shared/orders/table_order';
import PageHeader from '@/app/[locale]/shared/page-header';
import { dispatch } from '@/store';
import { getOrder, setIsView, updateOrder } from '@/store/slices/orderSlice';
import { RootState } from '@/store/types';
import { formatDate } from '@/utils/format-date';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Button, Loader, Text, Title, Badge, ActionIcon } from 'rizzui';
import { appendNoti, setIsLoading } from '@/store/slices/kitchen_order_notificationSlice';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import NotificationDropdown from '@/layouts/kitchen-notification-dropdown';
import usePusher from '@/hooks/use-pusher';

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
  const { data: notifications } = useSelector((state: RootState) => state.kitchen_order_notification);

  const { order, isLoadingGetOrder, isLoadingUpdateOrder } = useSelector((state: RootState) => state.order);
  const { openModal } = useModal();

  useEffect(() => {
    dispatch(getOrder(params.slug));
  }, [params]);

  const handlePay = () => {
    dispatch(setIsView(false));
    openModal({ view: <PayOrder />, customSize: '660px' });
  };

  usePusher('kitchenOrderWaitingEvent', (data) => {
    // Truy cập và xử lý dữ liệu từ đối tượng `data`
    const active = data.active;
    const productName = data.product_name;
    const productQuantity = data.product_quantity;
    const serviceName = data.service_name;

    // Set loading state
    dispatch(setIsLoading(true));

    // Append the notification
    dispatch(appendNoti(data));
    toast.success(`An order has to be delivered: ${productName} - ${productQuantity} - ${serviceName}`);
  });

  const handleUpdate = async () => {
    const value = {
      order_active: order?.active,
      products: order?.products,
      devices: order?.devices,
      customer_active: order?.customer?.active,
    };

    const result = await dispatch(updateOrder(value));
    if (updateOrder.fulfilled.match(result)) {
      toast.success('Update success');
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <NotificationDropdown notifications={notifications}>
          <ActionIcon
            aria-label="Notification"
            variant="text"
            className="relative h-[34px] w-[34px] shadow backdrop-blur-md md:h-9 md:w-9 dark:bg-gray-100"
          >
            <RingBellSolidIcon className="h-[18px] w-auto" />
            {notifications.length > 0 && (
              <Badge
                renderAsDot
                color="warning"
                enableOutlineRing
                className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
              />
            )}
          </ActionIcon>
        </NotificationDropdown>
      </PageHeader>
      <div className="grid  grid-cols-1 lg:grid-cols-2 lg:space-x-4 space-y-4">
        {isLoadingGetOrder ? (
          <div className="flex justify-center items-center h-[100px]">
            <Loader variant="spinner" size="xl" color="info" />
          </div>
        ) : (
          <>
            <div>
              <Title as="h5" className="mt-4">
                Invoice information
              </Title>
              <Text className="mt-1">Code Invoice: {params.slug}</Text>
              <Text className="mt-1">Service: {order?.service?.name}</Text>
              <Text className="mt-1">Price: {order?.service?.price?.pricePerHour}$/ 1 Hours</Text>
              <Text className="mt-1">
                Check in: {formatDate(new Date(order?.checkin_time ?? ''), 'DD/MM/YYYY, hh:mm:ss')}
              </Text>
            </div>
            <div>
              <SearchCustomer />
              <Text className="mt-4">
                Full name: {order?.customer != null ? order?.customer.first_name + ' ' + order?.customer.last_name : ''}
              </Text>
              <Text className="mt-2">Phone: {order?.customer?.phone}</Text>
              <Text className="mt-2">Email: {order?.customer?.email}</Text>
            </div>
          </>
        )}
      </div>

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
          <div className="space-y-3">
            <SearchDevice />
            <Title as="h5" className="my-3">
              Device list
            </Title>
            <TableDeviceOrder />
          </div>
        </div>
      </div>
      <div className="mt-[100px] space-x-3 flex justify-end">
        <Button onClick={handleUpdate} isLoading={isLoadingUpdateOrder} className="w-[80px]" color="primary">
          Update
        </Button>
        <Button onClick={handlePay} className="w-[80px]" color="danger">
          Pay
        </Button>
      </div>
    </>
  );
}