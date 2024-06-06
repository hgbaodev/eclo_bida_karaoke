'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';

import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteShiftDetail, getAllShiftDetails } from '@/store/slices/shift_detailSlice';
import toast from 'react-hot-toast';
import EditShiftDetail from '../edit-shift-detail';

export const getColumns = (openModal: (args: any) => void) => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, shiftdetail: ShiftDetail, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Day Of Week" />,
    dataIndex: 'day_of_week',
    key: 'day_of_week',
    width: 50,
    render: (_: string, shiftdetail: ShiftDetail) => shiftdetail.day_of_week,
  },
  {
    title: <HeaderCell title="Time in" />,
    dataIndex: 'time_in',
    key: 'time_in',
    width: 100,
    render: (_: string, shiftdetail: ShiftDetail) => shiftdetail.shift.time_in,
  },
  {
    title: <HeaderCell title="Time out" />,
    dataIndex: 'time_out',
    key: 'time_out',
    width: 100,
    render: (_: string, shiftdetail: ShiftDetail) => shiftdetail.shift.time_out,
  },
  {
    title: <HeaderCell title="Quantity Of Staff" />,
    dataIndex: 'quantity_of_staff',
    key: 'quantity_of_staff',
    width: 50,
    render: (_: string, shiftdetail: ShiftDetail) => shiftdetail.quantity_of_staff,
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
    render: (_: string, shiftdetail: ShiftDetail) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Staff'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                day_of_week: shiftdetail.day_of_week,
                quantity_of_staff: shiftdetail.quantity_of_staff,
                shift_id: shiftdetail.shift.active,
              };
              openModal({
                view: <EditShiftDetail shift_detail={data} active={shiftdetail.active} />,
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
          description={`Are you sure you want to delete this shift detail?`}
          onDelete={async () => {
            const result = await dispatch(deleteShiftDetail(shiftdetail.active)); // Remove the .then() block
            if (deleteShiftDetail.fulfilled.match(result)) {
              await dispatch(getAllShiftDetails({ page: 1, pageSize: 5, query: '' }));
              toast.success(`Shift detail has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete staff.`);
            }
          }}
        />
      </div>
    ),
  },
];

export interface ShiftDetail {
  active: string;
  day_of_week: string;
  quantity_of_staff: string;
  shift: {
    time_in: string;
    time_out: string;
    active: string;
  };
  created_at: string;
}
