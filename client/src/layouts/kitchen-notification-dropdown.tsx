'use client';

import { RefObject, useState } from 'react';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Popover, Title, Checkbox } from 'rizzui';
import Link from 'next/link';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { removeNoti, setIsLoading } from '@/store/slices/kitchen_order_notificationSlice';
import { dispatch } from '@/store';

dayjs.extend(relativeTime);

function NotificationsList({
  setIsOpen,
  notifications,
  handleRemoveNoti,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: any[];
  handleRemoveNoti: (active: string) => void;
}) {
  return (
    <div className="w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right">
      <div className="mb-3 flex items-center justify-between ps-6">
        <Title as="h5">Notifications</Title>
        <Checkbox label="Mark All As Read" />
      </div>
      <SimpleBar className="max-h-[420px]">
        <div className="grid cursor-pointer grid-cols-1 gap-1 ps-4">
          {notifications && notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.active}
                className="group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded bg-gray-100/70 p-1 dark:bg-gray-50/50 [&>svg]:h-auto [&>svg]:w-5">
                  {/* Icon or avatar if needed */} b
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                  <div className="w-full">
                    <Title as="h6" className="mb-0.5 w-11/12 truncate text-sm font-semibold">
                      {`Name: ${item.product_name}`}
                    </Title>

                    <Title as="h6" className="mb-0.5 w-11/12 truncate text-sm font-semibold">
                      {`Quantity: ${item.product_quantity} - Service: ${item.service_name}`}
                    </Title>
                  </div>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveNoti(item.active)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="ps-4 py-2 text-center text-gray-500">No notifications available</div>
          )}
        </div>
      </SimpleBar>
      <Link
        href={'#'}
        onClick={() => setIsOpen(false)}
        className="-me-6 block px-6 pb-0.5 pt-3 text-center hover:underline"
      >
        View All Activity
      </Link>
    </div>
  );
}

export default function NotificationDropdown({
  children,
  notifications = [],
}: {
  children: JSX.Element & { ref?: RefObject<any> };
  notifications?: any[];
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveNoti = (active: string) => {
    dispatch(setIsLoading(true));
    try {
      dispatch(removeNoti(active));
    } catch (error) {
      console.error('Error removing notification: ', error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Popover isOpen={isOpen} setIsOpen={setIsOpen} shadow="sm" placement={isMobile ? 'bottom' : 'bottom-end'}>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="z-[9999] px-0 pb-4 pe-6 pt-5 dark:bg-gray-100 [&>svg]:hidden sm:[&>svg]:inline-flex [&>svg]:dark:fill-gray-100">
        <NotificationsList setIsOpen={setIsOpen} notifications={notifications} handleRemoveNoti={handleRemoveNoti} />
      </Popover.Content>
    </Popover>
  );
}
