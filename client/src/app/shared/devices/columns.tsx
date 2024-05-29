'use client';

import AvatarCard from '@/components/ui/avatar-card';
import { HeaderCell } from '@/components/ui/table';
import env from '@/env';
import { render } from 'node_modules/@headlessui/react/dist/utils/render';

export const getColumns = () => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, device: Device, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: (_: string, device: Device) => (
      <AvatarCard src={env.API_STORAGE + device.image} name={device.name} description={device.description} />
    ),
  },
];

export interface Device {
  active: string;
  name: string;
  description: string;
  image: string;
  status: string;
}
