'use client';

import { Tooltip } from 'rizzui';
import { KitchenOrder } from '../types';
import { dispatch } from '@/store';
import React from 'react';
import usePusher from '@/hooks/use-pusher';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  markKitchenOrderAsProcessing,
  markKitchenOrderAsWaiting,
  markKitchenOrderAsDone,
  markOrderStatus,
} from '@/store/slices/kitchen_orderSlice';

export const STATUSES = {
  Received: 'R',
  Waiting: 'W',
  Processing: 'P',
} as const;

export function StatusButton({ status, active }: { status: KitchenOrder['status']; active: string }) {
  const t = useTranslations('kitchen-orders');
  const [isLoading, setLoading] = useState(false); // Sử dụng useState để quản lý trạng thái loading

  const buttonClass =
    'select-none rounded-lg border py-2 px-2 w-32 text-center align-middle text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';

  // Hàm xử lý khi nhấn nút Chế biến
  const handleMarkAsProcessing = async () => {
    setLoading(true); // Đặt isLoading thành true khi bắt đầu xử lý
    try {
      await dispatch(markKitchenOrderAsProcessing(active)); // Gọi hàm dispatch để thực hiện action markKitchenOrderAsProcessing
    } catch (error) {
      console.error('Error marking order as processing:', error); // Xử lý lỗi nếu có
    } finally {
      setLoading(false); // Đặt isLoading thành false sau khi xử lý hoàn tất (thành công hoặc thất bại)
    }
  };

  // Hàm xử lý khi nhấn nút Thông báo
  const handleMarkAsWaiting = async () => {
    setLoading(true); // Đặt isLoading thành true khi bắt đầu xử lý
    try {
      await dispatch(markKitchenOrderAsWaiting(active)); // Gọi hàm dispatch để thực hiện action markKitchenOrderAsWaiting
    } catch (error) {
      console.error('Error marking order as waiting:', error); // Xử lý lỗi nếu có
    } finally {
      setLoading(false); // Đặt isLoading thành false sau khi xử lý hoàn tất (thành công hoặc thất bại)
    }
  };

  // Hàm xử lý khi nhấn nút Hoàn thành
  const handleMarkAsDone = async () => {
    setLoading(true); // Đặt isLoading thành true khi bắt đầu xử lý
    try {
      await dispatch(markKitchenOrderAsDone(active)); // Gọi hàm dispatch để thực hiện action markKitchenOrderAsDone
    } catch (error) {
      console.error('Error marking order as done:', error); // Xử lý lỗi nếu có
    } finally {
      setLoading(false); // Đặt isLoading thành false sau khi xử lý hoàn tất (thành công hoặc thất bại)
    }
  };

  usePusher('kitchenOrderWaitingEvent', (eventData: any) => {
    if (eventData.active === active) {
      setLoading(true);
      try {
        dispatch(markOrderStatus({ active, status: 'W' }));
      } catch (error) {
        console.error('Error marking order as waited: ', error);
      } finally {
        setLoading(false);
      }
    }
  });

  usePusher('kitchenOrderProcessingEvent', (eventData: any) => {
    if (eventData.active === active) {
      setLoading(true);
      try {
        dispatch(markOrderStatus({ active, status: 'P' }));
      } catch (error) {
        console.error('Error marking order as processed: ', error);
      } finally {
        setLoading(false);
      }
    }
  });

  usePusher('kitchenOrderDoneEvent', (eventData: any) => {
    if (eventData.active === active) {
      setLoading(true);
      try {
        dispatch(markOrderStatus({ active, status: 'D' }));
      } catch (error) {
        console.error('Error marking order as finished: ', error);
      } finally {
        setLoading(false);
      }
    }
  });

  // Trả về nút dựa trên trạng thái status
  switch (status) {
    case STATUSES.Received:
      return (
        <Tooltip size="sm" content={t('confirm_processing')} placement="top" color="invert">
          <button
            className={`${buttonClass} text-yellow-600 ${isLoading ? 'opacity-75 pointer-events-none' : ''}`}
            type="button"
            onClick={handleMarkAsProcessing}
            disabled={isLoading}
          >
            {isLoading ? t('processing') : t('process')}
          </button>
        </Tooltip>
      );
    case STATUSES.Processing:
      return (
        <Tooltip size="sm" content={t('notify_staff_to_pick_up')} placement="top" color="invert">
          <button
            className={`${buttonClass} text-blue-600 ${isLoading ? 'opacity-75 pointer-events-none' : ''}`}
            type="button"
            onClick={handleMarkAsWaiting}
            disabled={isLoading}
          >
            {isLoading ? t('processing') : t('notify')}
          </button>
        </Tooltip>
      );
    case STATUSES.Waiting:
      return (
        <Tooltip size="sm" content={t('complete')} placement="top" color="invert">
          <button
            className={`${buttonClass} text-green-600 ${isLoading ? 'opacity-75 pointer-events-none' : ''}`}
            type="button"
            onClick={handleMarkAsDone}
            disabled={isLoading}
          >
            {isLoading ? t('processing') : t('complete')}
          </button>
        </Tooltip>
      );
    default:
      return (
        <Tooltip size="sm" content={t('not_available')} placement="top" color="invert">
          <button
            className="select-none rounded-lg border py-3 px-6 w-28 text-center align-middle text-xs font-bold uppercase text-gray-600 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            disabled
          >
            {t('not_available')}
          </button>
        </Tooltip>
      );
  }
}
