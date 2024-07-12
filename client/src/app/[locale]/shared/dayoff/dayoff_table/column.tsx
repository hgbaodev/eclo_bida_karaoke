'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import ShoppingBagSolidIcon from '@/components/icons/shopping-bag-solid';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteDayoff, getDayoffs } from '@/store/slices/dayoffSlice';
import toast from 'react-hot-toast';
// import EditDayOff from './edit-dayoff';
// import EditProduct_Detail from '../create-product_import_detail';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { Table } from 'antd'; // Sử dụng Ant Design cho bảng
import type { ColumnsType } from 'antd/es/table';

export function getStatusBadge(status: DayOff['type']) {
  switch (status) {
    case STATUSES.Unapproved:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Unapproved</Text>
        </div>
      );
    case STATUSES.Approved:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Approved</Text>
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

export const getColumns = (openModal: (args: any) => void,t:any) => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, dayoff: DayOff, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('uuid')} />,
    dataIndex: 'uuid',
    key: 'uuid',
    width: 50,
    render: (_: string, dayoff: DayOff) => dayoff.staff_dayoff.uuid,
  },
  {
    title: <HeaderCell title={t('staff_name')} />,
    dataIndex: 'staff_name',
    key: 'staff_name',
    width: 100,
    render: (_: string, dayoff: DayOff) => dayoff.staff_dayoff.last_name + ' ' + dayoff.staff_dayoff.first_name,
  },
  {
    title: <HeaderCell title={t('day_off')} />,
    dataIndex: 'day_off',
    key: 'day_off',
    width: 100,
    render: (_: number, dayoff: DayOff) => dayoff.day_off,
  },
  {
    title: <HeaderCell title={t('reason')} />,
    dataIndex: 'reason',
    key: 'reason',
    width: 50,
    render: (_: string, dayoff: DayOff) => dayoff.reason,
  },
  {
    title: <HeaderCell title={t('type')}/>,
    dataIndex: 'type',
    key: 'type',
    width: 50,
    render: (type: DayOff['type']) => getStatusBadge(type),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, dayoff: DayOff) => (
      <div className=" ">
        <DeletePopover
          title={t('delete')}
          description={t('delete_dayoff')}
          onDelete={async () => {
            const result = await dispatch(deleteDayoff(dayoff.active)); // Remove the .then() block
            if (deleteDayoff.fulfilled.match(result)) {
              await dispatch(getDayoffs({ page: 1, pageSize: 5, query: '' ,type:'' }));
              toast.success(t('success'));
            } else {
              toast.error(t('failed'));
            }
          }}
        />
      </div>
    ),
  },
];
export interface DayOff {
  active: string;
  staff_dayoff: {
    first_name: string;
    last_name: String;
    uuid: string;
  };
  reason: string;
  day_off: string;
  type: string;
}
export const STATUSES = {
  Approved: 'A',
  Unapproved: 'D',
} as const;
