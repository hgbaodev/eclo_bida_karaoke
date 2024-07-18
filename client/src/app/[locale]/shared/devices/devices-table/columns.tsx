'use client';

import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import { HeaderCell } from '@/components/ui/table';
import env from '@/env';
import { ActionIcon, Badge, Text, Tooltip } from 'rizzui';
import { dispatch } from '@/store';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import EditDevice from '../edit-device';
import { getDevices, deleteDevice } from '@/store/slices/device_slice';
import toast from 'react-hot-toast';
import WithPermission from '@/guards/with-permisson';

export const getColumns = (openModal: (args: any) => void, t: any) => [
  {
    title: <HeaderCell title={t('id')} />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, device: Device, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('image')} />,
    dataIndex: 'image',
    key: 'image',
    width: 100,
    render: (_: string, device: Device) => (
      <AvatarCard
        src={env.API_STORAGE + device.image}
        avatarProps={{
          name: device.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
        name={''}
      />
    ),
  },
  {
    title: <HeaderCell title={t('name')} />,
    dataIndex: 'name',
    key: 'name',
    width: 10,
    render: (_: string, device: Device) => (
      <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">{device.name}</Text>
    ),
  },
  {
    title: <HeaderCell title={t('description')} />,
    dataIndex: 'description',
    key: 'description',
    width: 10,
    render: (_: string, device: Device) => <Text className="text-[13px] text-gray-500">{device.description}</Text>,
  },
  {
    title: <HeaderCell title={t('value')} />,
    dataIndex: 'value',
    key: 'value',
    width: 10,
    render: (_: string, device: Device) => <Text className="text-[13px] text-gray-500">{device.value}</Text>,
  },
  {
    title: <HeaderCell title={t('status')} />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Device['status']) => StatusBadge(status, t),
  },
  {
    title: <HeaderCell title={t('action')} />,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, device: Device) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <WithPermission permission="device.Update">
          <Tooltip size="sm" content={t('edit_device')} placement="top" color="invert">
            <ActionIcon
              onClick={() => {
                const data = {
                  name: device.name,
                  description: device.description,
                  status: device.status,
                  value: Number(device.value),
                  image: null,
                };
                openModal({
                  view: <EditDevice device={data} active={device.active} />,
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
        <WithPermission permission="device.Delete">
          <DeletePopover
            title={t('delete_device', { deviceName: device.name })}
            description={t('delete_device_confirm', { deviceName: device.name })}
            onDelete={async () => {
              const result = await dispatch(deleteDevice(device.active));
              if (deleteDevice.fulfilled.match(result)) {
                await dispatch(getDevices({ page: 1, pageSize: 5, query: '', status: '' }));
                toast.success(t('delete_device_success', { deviceName: device.name }));
              } else {
                toast.error(t('delete_device_failed', { deviceName: device.name }));
              }
            }}
          />
        </WithPermission>
      </div>
    ),
  },
];

export interface Device {
  active: string;
  name: string;
  description: string;
  image: string;
  status: string;
  value: string;
}

export function StatusBadge(status: Device['status'], t: any) {
  switch (status) {
    case 'D':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{t('status_off')}</Text>
        </div>
      );
    case 'A':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{t('status_on')}</Text>
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
