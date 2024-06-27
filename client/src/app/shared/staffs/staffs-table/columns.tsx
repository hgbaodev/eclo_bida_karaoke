'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import staffSlice, { deleteStaff, getStaffs } from '@/store/slices/staffSlice';
import toast from 'react-hot-toast';
import EditStaff from '../edit-staff';
import { deleteUser } from '@/store/slices/userSlice';
import { env } from 'process';

export function getStatusBadge(status: Staff['status']) {
  switch (status) {
    case STATUSES.InActive:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">InActive</Text>
        </div>
      );
    case STATUSES.Active:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
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
    render: (_: any, staff: Staff, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, staff: Staff) => (
      <AvatarCard
        src={env.API_STORAGE + staff.image}
        avatarProps={{
          name: staff.last_name,
          size: 'lg',
          className: 'rounded-lg',
        }}
        name={staff.last_name + ' ' + staff.first_name}
        description={staff.idcard}
      />
    ),
  },
  {
    title: <HeaderCell title="Position" />,
    dataIndex: 'position',
    key: 'position',
    width: 100,
    render: (_: string, staff: Staff) => staff.position.name,
  },
  {
    title: <HeaderCell title="Birthday" />,
    dataIndex: 'birthday',
    key: 'birthday',
    width: 50,
    render: (_: string, staff: Staff) => staff.birthday,
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 50,
    render: (_: string, staff: Staff) => staff.phone,
  },
  {
    title: <HeaderCell title="UUID" />,
    dataIndex: 'uuid',
    key: 'uuid',
    width: 50,
    render: (_: string, staff: Staff) => staff.uuid,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Staff['status']) => getStatusBadge(status),
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
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, staff: Staff) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Staff'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                first_name: staff.first_name,
                last_name: staff.last_name,
                birthday: staff.birthday,
                idcard: staff.idcard,
                position: staff.position.active,
                phone: staff.phone,
                status: staff.status,
                gender: staff.gender,
                image: staff.image,
                address: staff.address,
                email: staff.user ? staff.user.email : '',
                role: staff.user ? staff.user.role.active : '',
                password: staff.user ? staff.user.password : '',
              };
              openModal({
                view: <EditStaff staff={data} active={staff.active} activeUser={staff.user ? staff.user.active : ''} />,
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
          title={`Delete this staff`}
          description={`Are you sure you want to delete this #${staff.first_name} staff?`}
          onDelete={async () => {
            const result = await dispatch(deleteStaff(staff.active)); // Remove the .then() block
            if (deleteStaff.fulfilled.match(result)) {
              await dispatch(deleteUser(staff.user ? staff.user.active : ''));
              await dispatch(getStaffs({ page: 1, pageSize: 5, query: '', position: '', status: '' }));
              toast.success(`Staff #${staff.first_name} has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete staff #${staff.active}.`);
            }
          }}
        />
      </div>
    ),
  },
];

export interface Staff {
  active: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  image: string;
  idcard: string;
  uuid: string;
  birthday: string;
  status: any;
  address: string;
  position: {
    name: string;
    active: string;
  };
  user: {
    active: string;
    email: string;
    password: string;
    role: {
      active: string;
    };
  } | null;
  created_at: string;
}
export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
