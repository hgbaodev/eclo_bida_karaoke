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
import WithPermission from '@/guards/with-permisson';

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

export function StatusBadge(status: Customer['status'], t: any) {
  switch (status) {
    case STATUSES.InActive:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">{t('status_inactive')}</Text>
        </div>
      );
    case STATUSES.Active:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{t('status_active')}</Text>
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
    title: <HeaderCell title={t('columns.no')} />,
    dataIndex: 'no.',
    key: 'no.',
    width: 50,
    render: (_: any, customer: Customer, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('columns.name')} />,
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
    title: <HeaderCell title={t('columns.phone')} />,
    dataIndex: 'phone',
    key: 'phone',
    width: 50,
    render: (_: string, customer: Customer) => customer.phone,
  },
  {
    title: <HeaderCell title={t('columns.created_at')} />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title={t('columns.status')} />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Customer['status']) => StatusBadge(status, t),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, customer: Customer) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <WithPermission permission="customer.Update">
          <Tooltip size="sm" content={t('edit_customer_tooltip')} placement="top" color="invert">
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
        </WithPermission>
        <WithPermission permission="customer.Delete">
          <DeletePopover
            title={t('delete_customer_title')}
            description={`${t('delete_customer_description')} #${customer.last_name} ${t('customer')}`}
            onDelete={async () => {
              const result = await dispatch(deleteCustomer(customer.active));
              if (deleteCustomer.fulfilled.match(result)) {
                await dispatch(getCustomers({ page: 1, pageSize: 5, query: '', status: '' }));
                toast.success(`${t('customer.delete_success')} ${customer.first_name} ${customer.last_name}.`);
              } else {
                toast.error(`${t('delete_failed')} ${customer.active}.`);
              }
            }}
          />
        </WithPermission>
      </div>
    ),
  },
];
