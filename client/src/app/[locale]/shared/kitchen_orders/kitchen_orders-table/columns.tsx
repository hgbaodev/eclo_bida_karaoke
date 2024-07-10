'use client';

import { HeaderCell } from '@/components/ui/table';
import { KitchenOrder } from '../types';
import { kitchenOrder } from '@/store/types';
import React from 'react';
import { useTranslations } from 'next-intl';
import { StatusButton } from './status-button';
import { StatusBadge } from './status-badge';

export const STATUSES = {
  Received: 'R',
  Waiting: 'W',
  Processing: 'P',
} as const;

export function DataColumns(data: kitchenOrder[]) {
  // const t = useTranslations('kitchen-orders');

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
      title: <HeaderCell title="Quantity" />,
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
      render: (status: KitchenOrder['status']) => StatusBadge(status),
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
}
