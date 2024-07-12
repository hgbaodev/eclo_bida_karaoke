'use client';

import { RefObject, useState } from 'react';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Popover, Title } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { removeNoti, setIsLoading } from '@/store/slices/kitchen_order_notification_slice';
import { dispatch } from '@/store';
import { useTranslations } from 'next-intl';

dayjs.extend(relativeTime);

function NotificationsList({
  setIsOpen,
  notifications,
  handleRemoveNoti,
  t,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: any[];
  handleRemoveNoti: (active: string) => void;
  t: any;
}) {
  return (
    <div className="w-[400px] text-left sm:w-[440px] 2xl:w-[500px] rtl:text-right">
      <div className="mb-3 flex items-center justify-between ps-6">
        <Title as="h5">{t('title')}</Title>
      </div>
      <SimpleBar className="max-h-[420px]">
        <div className="grid cursor-pointer grid-cols-1 gap-1 ps-4">
          {notifications && notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.active}
                className="group flex items-center justify-between gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
              >
                <div className="flex flex-col flex-grow">
                  <Title as="h6" className="mb-0.5 truncate text-sm font-semibold">
                    {`${t('name')}: ${item.product_name}`}
                  </Title>
                  <Title as="h6" className="mb-0.5 truncate text-sm font-light">
                    {`${t('quantity')}: ${item.product_quantity}`}
                  </Title>
                  <Title as="h6" className="mb-0.5 truncate text-sm font-light">
                    {`${t('location')}: ${item.service_name}`}
                  </Title>
                </div>
                <button className="text-red-500 hover:text-red-700 ml-3" onClick={() => handleRemoveNoti(item.active)}>
                  {t('delete')}
                </button>
              </div>
            ))
          ) : (
            <div className="ps-4 py-2 text-center text-gray-500">No notifications available</div>
          )}
        </div>
      </SimpleBar>
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
  const t = useTranslations('kitchen_notifications');
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
        <NotificationsList
          t={t}
          setIsOpen={setIsOpen}
          notifications={notifications}
          handleRemoveNoti={handleRemoveNoti}
        />
      </Popover.Content>
    </Popover>
  );
}
