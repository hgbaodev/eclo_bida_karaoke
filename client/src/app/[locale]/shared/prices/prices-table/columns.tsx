'use client';

import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import { getPrices, deletePrice } from '@/store/slices/priceSlice';
import toast from 'react-hot-toast';
import EditPrice from '../edit-price';

export function StatusBadge(status: Price['status'], t: any) {
  switch (status) {
    case STATUSES.InActive:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">{t('deactive')}</Text>
        </div>
      );
    case STATUSES.Active:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{t('active')}</Text>
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

export const getColumns = (openModal: (args: any) => void, t: any) => [
  {
    title: <HeaderCell title={t('no')} />,
    dataIndex: 'no.',
    key: 'no.',
    width: 50,
    render: (_: any, price: Price, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('name')} />,
    dataIndex: 'name',
    key: 'name',
    width: 50,
    render: (_: string, price: Price) => <AvatarCard src={price.image} name={price.name} />,
  },
  {
    title: <HeaderCell title={t('price_per_hour')} />,
    dataIndex: 'price',
    key: 'price',
    width: 50,
    render: (_: string, price: Price) => price.pricePerHour,
  },
  {
    title: <HeaderCell title={t('created_at')} />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title={t('status')} />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Price['status']) => StatusBadge(status, t),
  },
  {
    title: <HeaderCell title={t('action')} />,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, price: Price) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit price'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                name: price.name,
                pricePerHour: price.pricePerHour,
                status: price.status,
              };
              openModal({
                view: <EditPrice price={data} active={price.active} />,
              });
            }}
            as="span"
            size="sm"
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={t('delete')}
          description={t('delete_confirm_description')}
          onDelete={async () => {
            const result = await dispatch(deletePrice(price.active)); // Remove the .then() block
            if (deletePrice.fulfilled.match(result)) {
              await dispatch(getPrices({ page: 1, pageSize: 5, query: '', status: '' }));
              toast.success(t('successful'));
            } else {
              toast.error(t('failed'));
            }
          }}
        />
      </div>
    ),
  },
];

export interface Price {
  active: string;
  name: string;
  pricePerHour: number;
  status: any;
  image: string;
  created_at: string;
}

export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
