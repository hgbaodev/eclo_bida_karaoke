'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteUser, fetchAllUsers } from '@/store/slices/userSlice';
import toast from 'react-hot-toast';
import EditUser from '../edit-user';

export function getStatusBadge(status: User['status']) {
  status = parseInt(status);
  switch (status) {
    case STATUSES.Deactivated:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">Deactivated</Text>
        </div>
      );
    case STATUSES.Active:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case STATUSES.Pending:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">Pending</Text>
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
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, user: User) => <div className="inline-flex ps-3">{user.id}</div>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, user: User) => (
      <AvatarCard src={user.image} name={user.first_name + ' ' + user.last_name} description={user.email} />
    ),
  },
  {
    title: <HeaderCell title="Role" />,
    dataIndex: 'role',
    key: 'role',
    width: 50,
    render: (_: string, user: User) => user.role.name,
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
    render: (status: User['status']) => getStatusBadge(status),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, user: User) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role_id: user.role_id,
                status: user.status,
              };
              openModal({
                view: <EditUser user={data} id={user.id} />,
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
          title={`Delete this user`}
          description={`Are you sure you want to delete this #${user.id} user?`}
          onDelete={async () => {
            const result = await dispatch(deleteUser(user.id)); // Remove the .then() block
            if (deleteUser.fulfilled.match(result)) {
              await dispatch(fetchAllUsers({ page: 1, pageSize: 5, query: '', role: '', status: '' }));
              toast.success(`User #${user.id} has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete user #${user.id}.`);
            }
          }}
        />
      </div>
    ),
  },
];

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: any;
  image: string;
  status: any;
  role_id: any;
  role: {
    id: number;
    name: string;
    color: string;
  };
  created_at: string;
}

export const STATUSES = {
  Pending: 0,
  Active: 1,
  Deactivated: 2,
} as const;
