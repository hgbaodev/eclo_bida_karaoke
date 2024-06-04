'use client';

import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import { getPrices, deletePrice } from '@/store/slices/priceSlice';
import toast from 'react-hot-toast';
// import EditPrice from '../edit-price';

export function getStatusBadge(status: Price['status']) {
  switch (status) {
    case STATUSES.InActive:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">InActive</Text>
        </div>
      );
    case STATUSES.Active:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
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

export const getColumns = (openModal: (args: any) => void) => [
  {
    title: <HeaderCell title="No." />,
    dataIndex: 'no.',
    key: 'no.',
    width: 50,
    render: (_: any, price: Price, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, price: Price) => <AvatarCard src={price.image} name={price.name} />,
  },
  {
    title: <HeaderCell title="Price per hour" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 50,
    render: (_: string, price: Price) => price.pricePerHour,
  },
  {
    title: <HeaderCell title="Created" />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Price['status']) => getStatusBadge(status),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, price: Price) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Customer'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                name: price.name,
                phone: price.pricePerHour,
                status: price.status,
              };
              // openModal({
              //   view: <EditPrice price={data} active={price.active} />,
              // });
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
          title={`Delete this price`}
          description={`Are you sure you want to delete this #${price.name} price?`}
          onDelete={async () => {
            const result = await dispatch(deletePrice(price.active)); // Remove the .then() block
            if (deletePrice.fulfilled.match(result)) {
              await dispatch(getPrices({ page: 1, pageSize: 5, query: '', status: '' }));
              toast.success(`Price #${price.name} has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete price #${price.active}.`);
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
  pricePerHour: string;
  status: any;
  image: string;
  created_at: string;
}

export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
