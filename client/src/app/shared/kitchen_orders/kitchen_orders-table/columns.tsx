'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Badge, Tooltip } from 'rizzui';
import { KitchenOrder } from '../types';
import { dispatch } from '@/store';
import { kitchenOrder } from '@/store/types';
import React from 'react';
import usePusher from '@/hooks/use-pusher';
import { useState } from 'react';

import {
  markKitchenOrderAsProcessing,
  markKitchenOrderAsWaiting,
  markKitchenOrderAsDone,
  markOrderAsWaited,
  markOrderAsProcessed,
} from '@/store/slices/kitchen_orderSlice';

export const STATUSES = {
  Received: 'R',
  Waiting: 'W',
  Processing: 'P',
} as const;

export function StatusButton({ status, active }: { status: KitchenOrder['status']; active: string }) {
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
        dispatch(markOrderAsWaited({ active, status: 'W' }));
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
        dispatch(markOrderAsProcessed({ active, status: 'P' }));
      } catch (error) {
        console.error('Error marking order as processed: ', error);
      } finally {
        setLoading(false);
      }
    }
  });

  // Trả về nút dựa trên trạng thái status
  switch (status) {
    case STATUSES.Received:
      return (
        <Tooltip size="sm" content={'Xác nhận đang chế biến'} placement="top" color="invert">
          <button
            className={`${buttonClass} text-yellow-600 ${isLoading ? 'opacity-75 pointer-events-none' : ''}`}
            type="button"
            onClick={handleMarkAsProcessing}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Chế biến'}
          </button>
        </Tooltip>
      );
    case STATUSES.Processing:
      return (
        <Tooltip size="sm" content={'Thông báo cho nhân viên đến lấy'} placement="top" color="invert">
          <button
            className={`${buttonClass} text-blue-600 ${isLoading ? 'opacity-75 pointer-events-none' : ''}`}
            type="button"
            onClick={handleMarkAsWaiting}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Thông báo'}
          </button>
        </Tooltip>
      );
    case STATUSES.Waiting:
      return (
        <Tooltip size="sm" content={'Xác nhận nhân viên đã lấy'} placement="top" color="invert">
          <button
            className={`${buttonClass} text-green-600 ${isLoading ? 'opacity-75 pointer-events-none' : ''}`}
            type="button"
            onClick={handleMarkAsDone}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Hoàn thành'}
          </button>
        </Tooltip>
      );
    default:
      return (
        <Tooltip size="sm" content={'Không khả dụng'} placement="top" color="invert">
          <button
            className="select-none rounded-lg border py-3 px-6 w-28 text-center align-middle text-xs font-bold uppercase text-gray-600 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            disabled
          >
            Không khả dụng
          </button>
        </Tooltip>
      );
  }
}

export function getStatusBadge(status: KitchenOrder['status']) {
  switch (status) {
    case STATUSES.Received:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />

          <Text className="ms-2 font-medium text-yellow-600">Đã nhận</Text>
        </div>
      );
    case STATUSES.Waiting:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Chờ giao</Text>
        </div>
      );
    case STATUSES.Processing:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="ms-2 font-medium text-blue-600">Đang chế biến</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

export const DataColumns = (data: kitchenOrder[]) => {
  return [
    {
      title: <HeaderCell title="No." key="header-no" />,
      dataIndex: 'no.',
      key: 'no.',
      width: 8,
      render: (_: any, kitchenOrder: KitchenOrder, index: number) => (
        <div className="inline-flex ps-3">{index + 1}</div>
      ),
    },
    {
      title: <HeaderCell title="Name" />,
      dataIndex: 'name',
      key: 'name',
      width: 20,
      render: (_: string, kitchenOrder: KitchenOrder) => kitchenOrder.product_name,
    },
    {
      title: <HeaderCell title="Quan" />,
      dataIndex: 'quantity',
      key: 'quantity',
      width: 12,
      render: (_: string, kitchenOrder: KitchenOrder) => kitchenOrder.quantity,
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: 'status',
      key: 'status',
      width: 20,
      render: (status: KitchenOrder['status']) => getStatusBadge(status),
    },
    {
      title: <HeaderCell title="Action" />,
      dataIndex: 'action',
      key: 'action',
      width: 20,
      render: (_: string, kitchenOrder: KitchenOrder) => (
        <div className="flex items-center justify-start gap-3 pe-3">
          <StatusButton status={kitchenOrder.status} active={kitchenOrder.active} />
        </div>
      ),
    },
  ];
};
