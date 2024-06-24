'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Badge, Tooltip } from 'rizzui';
import { KitchenOrder } from '../types';
import { dispatch } from '@/store';
import {
  getKitchenOrders,
  markKitchenOrderAsProcessing,
  markKitchenOrderAsWaiting,
  markKitchenOrderAsDone,
} from '@/store/slices/kitchen_orderSlice';

export const STATUSES = {
  Received: 'R',
  Waiting: 'W',
  Processing: 'P',
} as const;

export function getStatusButton(status: KitchenOrder['status'], active: string) {
  const buttonClass =
    'select-none rounded-lg border py-2 px-2 w-32 text-center align-middle text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';

  const handleMarkAsProcessing = async () => {
    try {
      await dispatch(markKitchenOrderAsProcessing(active));
      await dispatch(getKitchenOrders());
    } catch (error) {
      console.error('Error marking order as processing:', error);
    }
  };

  const handleMarkAsWaiting = async () => {
    try {
      await dispatch(markKitchenOrderAsWaiting(active));
      await dispatch(getKitchenOrders());
    } catch (error) {
      console.error('Error marking order as waiting:', error);
    }
  };

  const handleMarkAsDone = async () => {
    try {
      await dispatch(markKitchenOrderAsDone(active));
      await dispatch(getKitchenOrders());
    } catch (error) {
      console.error('Error marking order as done:', error);
    }
  };

  switch (status) {
    case STATUSES.Received:
      return (
        <Tooltip size="sm" content={'Xác nhận đang chế biến'} placement="top" color="invert">
          <button className={`${buttonClass} text-yellow-600`} type="button" onClick={handleMarkAsProcessing}>
            Xác nhận chế biến
          </button>
        </Tooltip>
      );
    case STATUSES.Processing:
      return (
        <Tooltip size="sm" content={'Thông báo cho nhân viên đến lấy'} placement="top" color="invert">
          <button className={`${buttonClass} text-blue-600`} type="button" onClick={handleMarkAsWaiting}>
            Thông báo đã xong
          </button>
        </Tooltip>
      );
    case STATUSES.Waiting:
      return (
        <Tooltip size="sm" content={'Xác nhận nhân viên đã lấy'} placement="top" color="invert">
          <button className={`${buttonClass} text-green-600`} type="button" onClick={handleMarkAsDone}>
            Xác nhận đã lấy
          </button>
        </Tooltip>
      );
    default:
      return (
        <Tooltip size="sm" content={'Không khả dụng'} placement="top" color="invert">
          <button
            className="select-none rounded-lg border py-3 px-6 w-28 text-center align-middle text-xs font-bold uppercase text-gray-600 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
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

export const getColumns = (openModal: (args: any) => void) => {
  return [
    {
      title: <HeaderCell title="No." key="header-no" />,
      dataIndex: 'no.',
      key: 'no.',
      width: 32,
      render: (_: any, kitchenOrder: KitchenOrder, index: number) => (
        <div className="inline-flex ps-3">{index + 1}</div>
      ),
    },
    {
      title: <HeaderCell title="Name" />,
      dataIndex: 'name',
      key: 'name',
      width: 50,
      render: (_: string, kitchenOrder: KitchenOrder) => kitchenOrder.product_name,
    },
    {
      title: <HeaderCell title="Quan" />,
      dataIndex: 'quantity',
      key: 'quantity',
      width: 32,
      render: (_: string, kitchenOrder: KitchenOrder) => kitchenOrder.quantity,
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: 'status',
      key: 'status',
      width: 10,
      render: (status: KitchenOrder['status']) => getStatusBadge(status),
    },
    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 50,
      render: (_: string, kitchenOrder: KitchenOrder) => (
        <div className="flex items-center justify-end gap-3 pe-3">
          {getStatusButton(kitchenOrder.status, kitchenOrder.active)}
        </div>
      ),
    },
  ];
};
