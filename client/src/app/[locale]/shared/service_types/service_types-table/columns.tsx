'use client';

import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';

import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteServiceType, getServiceTypes } from '@/store/slices/serviceTypeSlice';
import toast from 'react-hot-toast';
import EditServiceType from '../edit-service_type';
// import EditSupplier from '../edit-supplier';

export function StatusBadge(status: ServiceType['status'], t: any) {
  switch (status) {
    case STATUSES.InActive:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">{t('active')}</Text>
        </div>
      );
    case STATUSES.Active:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{t('deactive')}</Text>
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
    render: (_: any, serviceType: ServiceType, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('full_name')} />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, serviceType: ServiceType) => serviceType.name,
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
    render: (status: ServiceType['status']) => StatusBadge(status, t),
  },
  {
    title: <HeaderCell title={t('action')} />,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, serviceType: ServiceType) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={t('edit')} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                name: serviceType.name,
                status: serviceType.status,
              };
              openModal({
                view: <EditServiceType service_type={data} active={serviceType.active} />,
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
          description={t('are_you_sure_to_delete')}
          onDelete={async () => {
            const result = await dispatch(deleteServiceType(serviceType.active)); // Remove the .then() block
            if (deleteServiceType.fulfilled.match(result)) {
              await dispatch(getServiceTypes({ page: 1, pageSize: 5, query: '', status: '' }));
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
