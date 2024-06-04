'use client';

import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';

import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import { getServiceTypes } from '@/store/slices/serviceTypeSlice';
import toast from 'react-hot-toast';
// import EditSupplier from '../edit-supplier';

export function getStatusBadge(status: ServiceType['status']) {
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
    render: (_: any, serviceType: ServiceType, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, serviceType: ServiceType) => <AvatarCard src={serviceType.image} name={serviceType.name} />,
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
    render: (status: ServiceType['status']) => getStatusBadge(status),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, serviceType: ServiceType) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Customer'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                name: serviceType.name,
                status: serviceType.status,
              };
              // openModal({
              //   view: <EditSupplier supplier={data} active={supplier.active} />,
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
        {/* <DeletePopover
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
        /> */}
      </div>
    ),
  },
];

export interface ServiceType {
  active: string;
  name: string;
  status: any;
  image: string;
  created_at: string;
}

export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
