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

export const getColumns = (openModal: (args: any) => void) => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, device: Device, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Image" />,
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
    title: <HeaderCell title="Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 10,
    render: (_: string, device: Device) => (
      <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">{device.name}</Text>
    ),
  },
  {
    title: <HeaderCell title="Description" />,
    dataIndex: 'description',
    key: 'description',
    width: 10,
    render: (_: string, device: Device) => <Text className="text-[13px] text-gray-500">{device.description}</Text>,
  },
  {
    title: <HeaderCell title="Value" />,
    dataIndex: 'value',
    key: 'value',
    width: 10,
    render: (_: string, device: Device) => <Text className="text-[13px] text-gray-500">{device.value}</Text>,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Device['status']) => StatusBadge(status),
  },
  {
    title: <HeaderCell title="Action" />,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, device: Device) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit this device'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                name: device.name,
                description: device.description,
                status: device.status,
                value: Number(device.value),
                image: device.image,
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
        <DeletePopover
          title={`Delete this device`}
          description={`Are you sure you want to delete this #${device.name} user?`}
          onDelete={async () => {
            const result = await dispatch(deleteDevice(device.active)); // Remove the .then() block
            if (deleteDevice.fulfilled.match(result)) {
              await dispatch(getDevices({ page: 1, pageSize: 5, query: '', status: '' }));
              toast.success(`Device #${device.name} has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete the device #${device.active}.`);
            }
          }}
        />
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

export function StatusBadge(status: Device['status']) {
  switch (status) {
    case 'D':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">Off</Text>
        </div>
      );
    case 'A':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">On</Text>
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
