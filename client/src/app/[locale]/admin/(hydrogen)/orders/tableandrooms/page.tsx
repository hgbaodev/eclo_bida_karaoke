'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import { dispatch } from '@/store';
import { createOrder, getAreas } from '@/store/slices/orderSlice';
import { RootState } from '@/store/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Dropdown, Text } from 'rizzui';
import { Tab } from 'rizzui';
import usePusher from '@/hooks/use-pusher';
import toast from 'react-hot-toast';
import NotificationDropdown from '@/layouts/kitchen-notification-dropdown';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import { Badge, ActionIcon } from 'rizzui';
import { appendNoti, setIsLoading } from '@/store/slices/kitchen_order_notification_slice';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';
import WithPermission from '@/guards/with-permisson';

export default function BlankPage() {
  const t = useTranslations('tables_rooms');
  const check = useCheckPermissions('order.View');
  if (!check) {
    window.location.href = '/error/403';
  }
  const pageHeader = {
    title: t('title'),
    breadcrumb: [
      {
        href: '/admin',
        name: t('breadcrumb_analytics'),
      },
      {
        name: t('title'),
      },
    ],
  };

  const { areas } = useSelector((state: RootState) => state.order);
  const { data: notifications } = useSelector((state: RootState) => state.kitchen_order_notification);

  const navigate = useRouter();

  useEffect(() => {
    dispatch(getAreas());
  }, []);

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

      <Tab>
        <Tab.List>
          {areas.map((area) => (
            <Tab.ListItem key={area.active}>{area.name}</Tab.ListItem>
          ))}
        </Tab.List>
        <Tab.Panels>
          {areas.map((area) => (
            <Tab.Panel key={area.active}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {area.services.map((service: any) => (
                  <div
                    key={service.active}
                    className={`relative border h-[100px] flex items-center justify-center rounded px-4 py-2 ${
                      service.is_booked ? 'bg-red-300' : 'bg-green-300'
                    }`}
                  >
                    <Dropdown placement="right-start" className="absolute top-1 right-1 cursor-pointer">
                      <Dropdown.Trigger>
                        <MdMoreHoriz
                          className="size-5 mb-2"
                          onClick={() => console.log('service ' + service.active + ' clicked')}
                        />
                      </Dropdown.Trigger>
                      <Dropdown.Menu className="!z-0">
                        {service.is_booked ? (
                          <>
                            <Dropdown.Item
                              onClick={() => navigate.push(`/admin/orders/${service?.order_active}`)}
                              className="gap-2 text-xs sm:text-sm"
                            >
                              Pay
                            </Dropdown.Item>
                          </>
                        ) : (
                          <Dropdown.Item
                            onClick={async () => {
                              const result = await dispatch(createOrder(service?.active));
                              if (createOrder.fulfilled.match(result)) {
                                navigate.push(`/admin/orders/${result.payload.data.active}`);
                              } else {
                                toast.error('Failed to create order');
                              }
                            }}
                            className="gap-2 text-xs sm:text-sm"
                          >
                            Order
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Text className="font-bold">{service.name}</Text>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab>
    </>
  );
}
