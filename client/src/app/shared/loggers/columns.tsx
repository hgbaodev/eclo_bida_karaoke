'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';

export const getColumns = () => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, loger: Logger) => <div className="inline-flex ps-3">{loger.id}</div>,
  },
  {
    title: <HeaderCell title="Name" />,
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
    title: <HeaderCell title="Functional" />,
    dataIndex: 'functional',
    key: 'functional',
    width: 50,
    render: (_: string, logger: Logger) => logger.functional,
  },
  {
    title: <HeaderCell title="Action" />,
    dataIndex: 'action',
    key: 'action',
    width: 50,
    render: (_: string, logger: Logger) => logger.action,
  },
  {
    title: <HeaderCell title="Role" />,
    dataIndex: 'role',
    key: 'role',
    width: 50,
    render: (_: string, logger: Logger) => logger.user.role.name,
  },
  {
    title: <HeaderCell title="URl" />,
    dataIndex: 'url',
    key: 'url',
    width: 50,
    render: (_: string, logger: Logger) => logger.url,
  },
  {
    title: <HeaderCell title="IP" />,
    dataIndex: 'IP',
    key: 'IP',
    width: 50,
    render: (_: string, logger: Logger) => logger.ip_address,
  },
  {
    title: <HeaderCell title="Created" />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <></>,
    dataIndex: '',
    key: '',
    width: 10,
    render: (_: string, logger: Logger) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {}}
            as="span"
            size="sm"
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      </div>
    ),
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
