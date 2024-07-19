'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import EditShift from '../edit-shift';
import { deleteShift, getAllShifts } from '@/store/slices/shiftSlice';
import WithPermission from '@/guards/with-permisson';

export function getStatusBadge(status: Shift['status'], t: any) {
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

export function getShiftTypeBadge(shift_type: Shift['shift_type']) {
  switch (shift_type) {
    case SHIFT_TYPE.PartTime:
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-dark">PartTime</Text>
        </div>
      );
    case SHIFT_TYPE.FullTime:
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-dark">FullTime</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Text className="ms-2 font-medium text-gray-600">{shift_type}</Text>
        </div>
      );
  }
}
export const getColumns = (openModal: (args: any) => void, t: any) => [
  {
    title: <HeaderCell title={t('table_id')} />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, shift: Shift, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('table_time_in')} />,
    dataIndex: 'time in',
    key: 'time in',
    width: 50,
    render: (_: string, shift: Shift) => shift.time_in,
  },
  {
    title: <HeaderCell title={t('table_time_out')} />,
    dataIndex: 'time out',
    key: 'time out',
    width: 50,
    render: (_: string, shift: Shift) => shift.time_out,
  },
  {
    title: <HeaderCell title={t('table_shifttype')} />,
    dataIndex: 'shifttype',
    key: 'shifttype',
    width: 10,
    render: (_: string, shift: Shift) => getShiftTypeBadge(shift.shift_type),
  },
  {
    title: <HeaderCell title={t('table_status')} />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Shift['status']) => getStatusBadge(status, t),
  },
  {
    title: <HeaderCell title={t('table_created')} />,
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
        <WithPermission permission="shifts.Update">
          <Tooltip size="sm" content={'Edit Shift'} placement="top" color="invert">
            <ActionIcon
              onClick={() => {
                const data = {
                  time_in: shift.time_in,
                  time_out: shift.time_out,
                  status: shift.status,
                  shift_type: shift.shift_type,
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
        </WithPermission>
        <WithPermission permission="shifts.Delete">
          <DeletePopover
            title={t('delete_shift')}
            description={t('delete_description')}
            onDelete={async () => {
              const result = await dispatch(deleteShift(shift.active)); // Remove the .then() block
              if (deleteShift.fulfilled.match(result)) {
                await dispatch(getAllShifts({ page: 1, pageSize: 5, query: '', status: '', shift_type: '' }));
                toast.success(t('delete_success'));
              } else {
                toast.error(t('delete_failed'));
              }
            }}
          />
        </WithPermission>
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
  shift_type: string;
}
export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
export const SHIFT_TYPE = {
  PartTime: 'P',
  FullTime: 'F',
} as const;
