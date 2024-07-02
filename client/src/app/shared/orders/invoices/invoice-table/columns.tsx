'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Select, Switch } from 'rizzui';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { dispatch } from '@/store';
import { changeStatusService } from '@/store/slices/serviceSlice';

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

export const getColumns = (openModal: any) => [
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
          const data = {
            status: event?.target?.checked ? 'A' : 'D',
            active: service.active,
          };
          dispatch(changeStatusService(data));
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
  service_type: {
    name: string;
    active: string;
    description: string;
  };
}
