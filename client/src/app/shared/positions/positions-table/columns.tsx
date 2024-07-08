'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import { deletePosition, getAllPositions } from '@/store/slices/positionSlice';
import toast from 'react-hot-toast';
import EditPosition from '../edit-position';

export function getStatusBadge(status: Position['status']) {
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
    render: (_: any, position: Position, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, position: Position) => position.name,
  },
  {
    title: <HeaderCell title="Base Salary" />,
    dataIndex: 'basesalary',
    key: 'basesalary',
    width: 100,
    render: (_: string, position: Position) => position.base_salary,
  },
  {
    title: <HeaderCell title="Salary Structure" />,
    dataIndex: 'salarystructure',
    key: 'salarystructure',
    width: 100,
    render: (_: string, position: Position) => position.salary_structure,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Position['status']) => getStatusBadge(status),
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
    render: (_: string, position: Position) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Position'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                name: position.name,
                base_salary: position.base_salary,
                salary_structure: position.salary_structure,
                status: position.status,
              };
              openModal({
                view: <EditPosition position={data} active={position.active} />,
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
          title={`Delete this position`}
          description={`Are you sure you want to delete this #${position.name} position?`}
          onDelete={async () => {
            const result = await dispatch(deletePosition(position.active)); // Remove the .then() block
            if (deletePosition.fulfilled.match(result)) {
              await dispatch(getAllPositions({ page: 1, pageSize: 5, query: '', status: '' }));
              toast.success(`Staff #${position.name} has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete staff #${position.active}.`);
            }
          }}
        />
      </div>
    ),
  },
];

export interface Position {
  active: string;
  name: string;
  base_salary: string;
  salary_structure: string;
  status: any;
  created_at: string;
}
export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
