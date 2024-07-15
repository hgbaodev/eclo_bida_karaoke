'use client';

import { HeaderCell } from '@/components/ui/table';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';

export const getColumns = (t: any) => [
  {
    title: <HeaderCell title={t('columns.id')} />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, loger: Logger) => <div className="inline-flex ps-3">{loger.id}</div>,
  },
  {
    title: <HeaderCell title={t('columns.name')} />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 80,
    render: (_: string, logger: Logger) => (
      <AvatarCard
        src={logger.user.image}
        name={logger.user.first_name + ' ' + logger.user.last_name}
        description={logger.user.email}
      />
    ),
  },
  {
    title: <HeaderCell title={t('columns.functional')} />,
    dataIndex: 'functional',
    key: 'functional',
    width: 50,
    render: (_: string, logger: Logger) => logger.functional,
  },
  {
    title: <HeaderCell title={t('columns.action')} />,
    dataIndex: 'action',
    key: 'action',
    width: 50,
    render: (_: string, logger: Logger) => logger.action,
  },
  {
    title: <HeaderCell title={t('columns.role')} />,
    dataIndex: 'role',
    key: 'role',
    width: 50,
    render: (_: string, logger: Logger) => logger.user.role.name,
  },
  {
    title: <HeaderCell title={t('columns.url')} />,
    dataIndex: 'url',
    key: 'url',
    width: 50,
    render: (_: string, logger: Logger) => logger.url,
  },
  {
    title: <HeaderCell title={t('columns.ip')} />,
    dataIndex: 'IP',
    key: 'IP',
    width: 50,
    render: (_: string, logger: Logger) => logger.ip_address,
  },
  {
    title: <HeaderCell title={t('columns.created_at')} />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
];

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  status: string;
  active: string;
  created_at: string;
  role: Role;
}

export interface Role {
  name: string;
  color: string;
  active: string;
}

export interface Logger {
  id: number;
  user_id: number;
  functional: string;
  action: string;
  url: string;
  ip_address: string;
  created_at: string;
  updated_at: string;
  user: User;
}
