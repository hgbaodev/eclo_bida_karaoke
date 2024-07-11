'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, ActionIcon, Tooltip, Select, Switch } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';
import { dispatch } from '@/store';
import { changeStatusService, deleteService, getServices } from '@/store/slices/serviceSlice';
import EditTableAndRoom from '../edit-tableandroom';
import toast from 'react-hot-toast';
import Link from 'next/link';
import EyeIcon from '@/components/icons/eye';

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

export const getColumns = (openModal: any, t: any) => [
  {
    title: <HeaderCell title={t('no')} />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, service: Service, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('name')} />,
    dataIndex: 'name',
    key: 'name',
    width: 250,
    render: (name: string) => <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">{name}</Text>,
  },
  {
    title: <HeaderCell title={t('price_per_hour')} />,
    dataIndex: 'price',
    width: 50,
    render: (_: any, service: Service) => <Text>{service?.price?.pricePerHour}$</Text>,
  },
  {
    title: <HeaderCell title={t('area')} />,
    dataIndex: 'area',
    width: 50,
    render: (_: any, service: Service) => <Text>{service?.area?.name}</Text>,
  },
  {
    title: <HeaderCell title={t('status')} />,
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
    title: <HeaderCell title={t('created_at')} />,
    dataIndex: 'created_at',
    key: 'created_at',
    width: 50,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title={t('action')} className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 180,
    render: (_: string, service: Service) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={t('action')}
            className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
            onClick={() => {
              const data = {
                name: service.name,
                description: service.description,
                status: service.status,
                area_active: service.area.active,
                price_active: service.price.active,
                service_type_active: service.service_type.active,
              };
              openModal({
                view: <EditTableAndRoom service={data} active={service.active} />,
              });
            }}
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip size="sm" content={t('show_more_detail')} placement="top" color="invert">
          <Link
            href={{
              pathname: `/admin/services/tableandrooms/${service.active}`,
            }}
          >
            <ActionIcon size="sm" variant="outline" className="inline-flex items-center">
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={t('delete')}
          description={t('are_you_sure_to_delete')}
          onDelete={async () => {
            const result = await dispatch(deleteService(service.active));
            if (deleteService.fulfilled.match(result)) {
              await dispatch(getServices({ page: 1, pageSize: 5, query: '', area: '' }));
              toast.success(t('successful'));
            } else {
              toast.error(t('failed'));
            }
          }}
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
  service_type: {
    name: string;
    active: string;
    description: string;
  };
}
