'use client';

import { RefObject, useState } from 'react';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Popover, Title, Badge, Checkbox } from 'rizzui';
import Link from 'next/link';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { PiCheck } from 'react-icons/pi';

dayjs.extend(relativeTime);

function NotificationsList({
  setIsOpen,
  notifications,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: any[];
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
                  {/* Icon or avatar if needed */}
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                  <div className="w-full">
                    <Title as="h6" className="mb-0.5 w-11/12 truncate text-sm font-semibold">
                      {`${item.product_name} - SL: ${item.product_quantity} - ${item.service_name}`}
                    </Title>
                    <span className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                      {/* @ts-ignore */}
                      {dayjs(item.sendTime).fromNow(true)}
                    </span>
                  </div>
                  <div className="ms-auto flex-shrink-0">
                    {item.unRead ? (
                      <Badge renderAsDot size="lg" color="primary" className="scale-90" />
                    ) : (
                      <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50">
                        <PiCheck className="h-auto w-[9px]" />
                      </span>
                    )}
                  </div>
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
  return (
    <Popover isOpen={isOpen} setIsOpen={setIsOpen} shadow="sm" placement={isMobile ? 'bottom' : 'bottom-end'}>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="z-[9999] px-0 pb-4 pe-6 pt-5 dark:bg-gray-100 [&>svg]:hidden sm:[&>svg]:inline-flex [&>svg]:dark:fill-gray-100">
        <NotificationsList setIsOpen={setIsOpen} notifications={notifications} />
      </Popover.Content>
    </Popover>
  );
}
