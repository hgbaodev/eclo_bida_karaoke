'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import { deletePosition, getAllPositions } from '@/store/slices/positionSlice';
import toast from 'react-hot-toast';
import EditPosition from '../edit-position';
import WithPermission from '@/guards/with-permisson';

export function getStatusBadge(status: Position['status'], t: any) {
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
    title: <HeaderCell title={t('table_id')} />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, position: Position, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('table_name')} />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, position: Position) => position.name,
  },
  {
    title: <HeaderCell title={t('table_basesalary')} />,
    dataIndex: 'basesalary',
    key: 'basesalary',
    width: 100,
    render: (_: string, position: Position) =>
      position.base_salary.toLocaleString('de-DE', { minimumFractionDigits: 2 }),
  },
  {
    title: <HeaderCell title={t('table_structure')} />,
    dataIndex: 'salarystructure',
    key: 'salarystructure',
    width: 100,
    render: (_: string, position: Position) => position.salary_structure,
  },
  {
    title: <HeaderCell title={t('table_status')} />,
    dataIndex: 'status',
    key: 'status',
    width: 10,
    render: (status: Position['status']) => getStatusBadge(status, t),
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
    render: (_: string, position: Position) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <WithPermission permission="position.Update">
          <Tooltip size="sm" content={t('edit_position')} placement="top" color="invert">
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
        </WithPermission>
        <WithPermission permission="position.Delete">
          <DeletePopover
            title={t('delete_position')}
            description={t('delete_description')}
            onDelete={async () => {
              const result = await dispatch(deletePosition(position.active)); // Remove the .then() block
              if (deletePosition.fulfilled.match(result)) {
                await dispatch(getAllPositions({ page: 1, pageSize: 5, query: '', status: '' }));
                toast.success(t('delete_success'));
              } else {
                toast.error(`Failed to delete staff #${position.active}.`);
              }
            }}
          />
        </WithPermission>
      </div>
    ),
  },
];

export interface Position {
  active: string;
  name: string;
  base_salary: number;
  salary_structure: string;
  status: any;
  created_at: string;
}
export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
