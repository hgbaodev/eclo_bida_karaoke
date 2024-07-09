'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import EditCustomer from '../edit-customer';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import { getCustomers, deleteCustomer } from '@/store/slices/customerSlice';
import toast from 'react-hot-toast';

export interface Customer {
  active: string;
  first_name: string;
  last_name: string;
  email: string;
  status: any;
  image: string;
  phone: string;
  created_at: string;
}

export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;

export function getStatusBadge(status: Customer['status']) {
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
    render: (_: any, customer: Customer, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, customer: Customer) => (
      <AvatarCard
        src={customer.image}
        name={customer.first_name + ' ' + customer.last_name}
        description={customer.email}
      />
    ),
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 50,
    render: (_: string, customer: Customer) => customer.phone,
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
    render: (status: Customer['status']) => getStatusBadge(status),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, customer: Customer) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Customer'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                first_name: customer.first_name,
                last_name: customer.last_name,
                email: customer.email,
                phone: customer.phone,
                status: customer.status,
              };
              openModal({
                view: <EditCustomer customer={data} active={customer.active} />,
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
          title={`Delete this customer`}
          description={`Are you sure you want to delete this #${customer.last_name} customer?`}
          onDelete={async () => {
            const result = await dispatch(deleteCustomer(customer.active)); // Remove the .then() block
            if (deleteCustomer.fulfilled.match(result)) {
              await dispatch(getCustomers({ page: 1, pageSize: 5, query: '', status: '' }));
              toast.success(`Customer #${customer.first_name} ${customer.last_name} has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete customer #${customer.active}.`);
            }
          }}
        />
      </div>
    ),
  },
];
