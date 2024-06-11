'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, ActionIcon, Tooltip, Select, Switch } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { title } from 'process';

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onHeaderCellClick,
}: Columns) => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, service: Service, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Service Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 250,
    render: (name: string) => <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">{name}</Text>,
  },
  {
    title: <HeaderCell title="Price/Hours" />,
    dataIndex: 'price',
    width: 50,
    render: (_: any, service: Service) => <Text>{service?.price?.pricePerHour}$</Text>,
  },
  {
    title: <HeaderCell title="Area" />,
    dataIndex: 'area',
    width: 50,
    render: (_: any, service: Service) => <Text>{service?.area?.name}</Text>,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    width: 50,
    render: (_: any, service: Service) => (
      <Switch
        defaultChecked={service?.status == 'A'}
        onChange={(event) => {
          console.log(event?.target?.checked);
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Created" />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  // {
  //   title: <HeaderCell title="Candidates" />,
  //   dataIndex: 'candidates',
  //   key: 'candidates',
  //   width: 120,
  //   render: (candidates: number) => <Text>{candidates}</Text>,
  // },
  // {
  //   title: <HeaderCell title="In Process" />,
  //   dataIndex: 'inProcess',
  //   key: 'inProcess',
  //   width: 120,
  //   render: (inProcess: number) => <Text>{inProcess}</Text>,
  // },
  // {
  //   title: <HeaderCell title="Hired" />,
  //   dataIndex: 'hired',
  //   key: 'hired',
  //   width: 80,
  //   render: (hired: number) => <Text>{hired}</Text>,
  // },
  // {
  //   title: <HeaderCell title="Category" />,
  //   dataIndex: 'category',
  //   key: 'category',
  //   width: 260,
  //   render: (category: string[]) => {
  //     let print = category?.slice(0, 2);
  //     let more = category.length - category.slice(0, 2).length;
  //     return (
  //       <div className="flex h-auto flex-wrap gap-2">
  //         {print.map((item: string, index: number) => (
  //           <span key={index} className="rounded-full bg-gray-100 px-2 py-1 text-xs">
  //             {item}
  //           </span>
  //         ))}
  //         <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">+{more}</span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   title: (
  //     <HeaderCell title="Status" sortable ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'status'} />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('status'),
  //   dataIndex: 'status',
  //   key: 'status',
  //   width: 180,
  //   render: (status: string) => {
  //     return <StatusSelect selectItem={status} />;
  //   },
  // },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 180,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'Edit Appointment'}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip size="sm" content={'View'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'View Appointment'}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete the job post`}
          description={`Are you sure you want to delete this job post?`}
          onDelete={() => onDeleteItem('1')}
        />
      </div>
    ),
  },
];

function StatusSelect({ selectItem }: { selectItem?: string }) {
  const selectItemValue = statusOptions.find((option) => option.value === selectItem);
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[140px]"
      inPortal={false}
      placeholder="Select Role"
      options={statusOptions}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) => renderOptionDisplayValue(option.value as string)}
    />
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value) {
    case 'Closed':
      return (
        <div className="flex items-center">
          <PiPlusCircle className="shrink-0 rotate-45 fill-red-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">{value}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-green-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">{value}</Text>
        </div>
      );
  }
}

interface Service {
  id: number;
  name: string;
  description: string;
  status: string;
  active: string;
  created_at: string;
  area: {
    name: string;
    description: string;
    active: string;
  };
  price: {
    active: string;
    name: string;
    pricePerHour: number;
    status: string;
  };
}
