'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import EditShift from '../edit-shift';
import { deleteShift, getAllShifts } from '@/store/slices/shiftSlice';

export function getStatusBadge(status: Shift['status']) {
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
    render: (_: any, shift: Shift, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Time in" />,
    dataIndex: 'time in',
    key: 'time in',
    width: 50,
    render: (_: string, shift: Shift) => shift.time_in,
  },
  {
    title: <HeaderCell title="Time out" />,
    dataIndex: 'time out',
    key: 'time out',
    width: 100,
    render: (_: string, shift: Shift) => shift.time_out,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Shift['status']) => getStatusBadge(status),
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
    render: (_: string, shift: Shift) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Position'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                time_in: shift.time_in,
                time_out: shift.time_out,
                status: shift.status,
              };
              openModal({
                view: <EditShift shift={data} active={shift.active} />,
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
          description={`Are you sure you want to delete this #(${shift.time_in} - ${shift.time_out}) position?`}
          onDelete={async () => {
            const result = await dispatch(deleteShift(shift.active)); // Remove the .then() block
            if (deleteShift.fulfilled.match(result)) {
              await dispatch(getAllShifts({ page: 1, pageSize: 5, query: '', status: '' }));
              toast.success(`Staff #(${shift.time_in} - ${shift.time_out}) has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete staff #${shift.active}.`);
            }
          }}
        />
      </div>
    ),
  },
];

export interface Shift {
  active: string;
  time_in: string;
  time_out: string;
  status: any;
  created_at: string;
}
export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
