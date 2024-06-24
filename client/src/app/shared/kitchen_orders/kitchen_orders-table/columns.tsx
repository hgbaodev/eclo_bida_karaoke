'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Badge, Tooltip } from 'rizzui';
import { KitchenOrder } from '../types';
import ModalButton from '@/app/shared/modal-button';

export const STATUSES = {
  Received: 'R',
  Waiting: 'W',
} as const;

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
      width: 50,
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
      title: <HeaderCell title="Quantity" />,
      dataIndex: 'quantity',
      key: 'quantity',
      width: 50,
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
      width: 10,
      render: (_: string, kitchenOrder: KitchenOrder) => (
        <div className="flex items-center justify-end gap-3 pe-3">
          <Tooltip size="sm" content={'Xác nhận đang chế biến'} placement="top" color="invert">
            <button
              className="select-none rounded-lg border py-3 px-6 text-center align-middle text-xs font-bold uppercase text-blue-600 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Bắt đầu chế biến
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];
};
