'use client';

import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import { getSuppliers, deleteSupplier } from '@/store/slices/supplierSlice';
import toast from 'react-hot-toast';
import EditSupplier from '../edit-supplier';

export function getStatusBadge(status: Supplier['status']) {
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
    render: (_: any, supplier: Supplier, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, supplier: Supplier) => (
      <AvatarCard src={supplier.image} name={supplier.name} description={supplier.address} />
    ),
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 50,
    render: (_: string, supplier: Supplier) => supplier.phone,
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
    render: (status: Supplier['status']) => getStatusBadge(status),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, supplier: Supplier) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Customer'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                name: supplier.name,
                address: supplier.address,
                phone: supplier.phone,
                status: supplier.status,
              };
              openModal({
                view: <EditSupplier supplier={data} active={supplier.active} />,
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
          title={`Delete this supplier`}
          description={`Are you sure you want to delete this #${supplier.name} supplier?`}
          onDelete={async () => {
            const result = await dispatch(deleteSupplier(supplier.active)); // Remove the .then() block
            if (deleteSupplier.fulfilled.match(result)) {
              await dispatch(getSuppliers({ page: 1, pageSize: 5, query: '', status: '' }));
              toast.success(`Supplier #${supplier.name} has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete supplier #${supplier.active}.`);
            }
          }}
        />
      </div>
    ),
  },
];

export interface Supplier {
  active: string;
  name: string;
  address: string;
  status: any;
  image: string;
  phone: string;
  created_at: string;
}

export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
