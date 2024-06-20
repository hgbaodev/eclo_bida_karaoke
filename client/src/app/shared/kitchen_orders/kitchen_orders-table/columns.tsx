'use client';

import { HeaderCell } from '@/components/ui/table';
import AvatarCard from '@/components/ui/avatar-card';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import { ProductOrderNotification } from '../types';

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
      render: (_: any, productOrderNotification: ProductOrderNotification, index: number) => (
        <div className="inline-flex ps-3">{index + 1}</div>
      ),
    },
    {
      title: <HeaderCell title="Requested Products" key="header-products" />,
      dataIndex: 'requestedProduct',
      key: 'requestedProduct',
      render: (_: string, productOrderNotification: ProductOrderNotification) => (
        <div>
          {productOrderNotification.data.requestedProduct &&
          productOrderNotification.data.requestedProduct.length > 0 ? (
            productOrderNotification.data.requestedProduct.map((product, index) => (
              <div key={index} className="border rounded p-3">
                <div className="">
                  <strong>Active:</strong> {product.active}
                </div>
                <div className="">
                  <strong>Quantity:</strong> {product.quantity}
                </div>
                <div className="flex justify-end">
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    className="hover:border-gray-900 hover:text-gray-700 cursor-pointer"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </div>
              </div>
            ))
          ) : (
            <div>No requested products</div>
          )}
        </div>
      ),
    },
  ];
};
