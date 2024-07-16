'use client';

import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteUser, getUsers } from '@/store/slices/userSlice';
import toast from 'react-hot-toast';
import EditUser from '../edit-user';
import WithPermission from '@/guards/with-permisson';

export function getStatusBadge(status: User['status'], t: any) {
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
    title: <HeaderCell title={t('id')} />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, user: User, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('name')} />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, user: User) => (
      <AvatarCard src={user.image} name={user.first_name + ' ' + user.last_name} description={user.email} />
    ),
  },
  {
    title: <HeaderCell title={t('role')} />,
    dataIndex: 'role',
    key: 'role',
    width: 50,
    render: (_: string, user: User) => user.role.name,
  },
  {
    title: <HeaderCell title={t('created')} />,
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
    render: (status: User['status']) => getStatusBadge(status, t),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, user: User) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <WithPermission permission="user.Update">
          <Tooltip size="sm" content={t('edit_user')} placement="top" color="invert">
            <ActionIcon
              onClick={() => {
                const data = {
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  role: user.role.active,
                  status: user.status,
                };
                openModal({
                  view: <EditUser user={data} active={user.active} />,
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
        <WithPermission permission="user.Delete">
          <DeletePopover
            title={t('delete_user_title')}
            description={`${t('delete_user_description')} #${user.last_name} ${t('user')}`}
            onDelete={async () => {
              const result = await dispatch(deleteUser(user.active)); // Remove the .then() block
              if (deleteUser.fulfilled.match(result)) {
                await dispatch(getUsers({ page: 1, pageSize: 5, query: '', role: '', status: '' }));
                toast.success(`${t('user')} #${user.first_name} ${user.last_name} ${t('deleted_successfully')}.`);
              } else {
                toast.error(`${t('failed_to_delete_user')} #${user.active}.`);
              }
            }}
          />
        </WithPermission>
      </div>
    ),
  },
];

export interface User {
  active: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  status: any;
  role: {
    name: string;
    color: string;
    active: string;
  };
  created_at: string;
}

export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
