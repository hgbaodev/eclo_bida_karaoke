'use client';

import { Text, Badge, Tooltip } from 'rizzui';
import { KitchenOrder } from '../types';
import React from 'react';

export const STATUSES = {
  Received: 'R',
  Waiting: 'W',
  Processing: 'P',
} as const;

export function StatusBadge(status: KitchenOrder['status'], t: any) {
  switch (status) {
    case STATUSES.Received:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />

          <Text className="ms-2 font-medium text-yellow-600">{t('received')}</Text>
        </div>
      );
    case STATUSES.Waiting:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{t('waiting')}</Text>
        </div>
      );
    case STATUSES.Processing:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="ms-2 font-medium text-blue-600">{t('processing')}</Text>
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
