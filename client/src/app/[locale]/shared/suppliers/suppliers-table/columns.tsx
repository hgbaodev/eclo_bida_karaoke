'use client';

import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import { getSuppliers, deleteSupplier } from '@/store/slices/supplier_slice';
import toast from 'react-hot-toast';
import EditSupplier from '../edit-supplier';

export function StatusBadge(status: Supplier['status'], t: any) {
  switch (status) {
    case STATUSES.InActive:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">{t('inactive')}</Text>
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
    title: <HeaderCell title={t('table_columns.no')} />,
    dataIndex: 'no.',
    key: 'no.',
    width: 50,
    render: (_: any, supplier: Supplier, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('table_columns.name')} />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, supplier: Supplier) => (
      <AvatarCard src={supplier.image} name={supplier.name} description={supplier.address} />
    ),
  },
  {
    title: <HeaderCell title={t('table_columns.phone')} />,
    dataIndex: 'phone',
    key: 'phone',
    width: 50,
    render: (_: string, supplier: Supplier) => supplier.phone,
  },
  {
    title: <HeaderCell title={t('table_columns.created_at')} />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title={t('table_columns.status')} />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Supplier['status']) => StatusBadge(status, t),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, supplier: Supplier) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={t('edit_supplier_tooltip')} placement="top" color="invert">
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
          title={t('delete_supplier_title')}
          description={t('delete_supplier_description', { supplier_name: supplier.name })}
          onDelete={async () => {
            const result = await dispatch(deleteSupplier(supplier.active));
            if (deleteSupplier.fulfilled.match(result)) {
              await dispatch(getSuppliers({ page: 1, pageSize: 5, query: '', status: '' }));
              toast.success(t('supplier_deleted_success', { supplier_name: supplier.name }));
            } else {
              toast.error(t('supplier_delete_failed', { supplier_active: supplier.active }));
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
