'use client';

import { HeaderCell } from '@/components/ui/table';
import AvatarCard from '@/components/ui/avatar-card';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import { kitchenOrder } from '../types';

export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;

export const getColumns = (openModal: (args: any) => void) => {
  return [
    {
      title: <HeaderCell title="No." key="header-no" />,
      dataIndex: 'no.',
      key: 'no.',
      width: 50,
      render: (_: any, kitchenOrder: kitchenOrder, index: number) => (
        <div className="inline-flex ps-3">{index + 1}</div>
      ),
    },
    {
      title: <HeaderCell title="Name" />,
      dataIndex: 'name',
      key: 'name',
      width: 50,
      render: (_: string, kitchenOrder: kitchenOrder) => kitchenOrder.product_name,
    },
    {
      title: <HeaderCell title="Quantity" />,
      dataIndex: 'quantity',
      key: 'quantity',
      width: 50,
      render: (_: string, kitchenOrder: kitchenOrder) => kitchenOrder.quantity,
    },
  ];
};
