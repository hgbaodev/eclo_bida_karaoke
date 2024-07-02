'use client';

import { HeaderCell } from '@/components/ui/table';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import EditServiceDeviceDetail from '../edit-service-device';
import PencilIcon from '@/components/icons/pencil';

export interface ServiceDeviceDetail {
  active: string;
  device_name: string;
  device_value: number;
  device_active: string;
  service_active: string;
  quantity: string;
  maintaining_quantity: string;
  status: any;
}

export enum ServiceDeviceStatusEnum {
  IN_USE = 'in_use',
  AVAILABLE = 'available',
  MAINTENANCE = 'maintenance',
  OUT_OF_ORDER = 'out_of_order',
}

export function getStatusBadge(status: ServiceDeviceStatusEnum) {
  switch (status) {
    case ServiceDeviceStatusEnum.IN_USE:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="ms-2 font-medium text-blue-dark">Đang sử dụng</Text>
        </div>
      );
    case ServiceDeviceStatusEnum.AVAILABLE:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Khả dụng</Text>
        </div>
      );
    case ServiceDeviceStatusEnum.MAINTENANCE:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-yellow-600">Bảo trì</Text>
        </div>
      );
    case ServiceDeviceStatusEnum.OUT_OF_ORDER:
      return (
        <div className="flex items-center">
          <Badge className="bg-gray-400" renderAsDot />
          <Text className="ms-2 font-medium text-gray-dark">Không hoạt động</Text>
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
    title: <HeaderCell title="No." />,
    dataIndex: 'no.',
    key: 'no.',
    width: 50,
    render: (_: any, device: ServiceDeviceDetail, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Device name" />,
    dataIndex: 'deviceName',
    key: 'deviceName',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => device.device_name,
  },
  {
    title: <HeaderCell title="Quantity" />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => device.quantity,
  },
  {
    title: <HeaderCell title="Value" />,
    dataIndex: 'value',
    key: 'value',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => device.device_value,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => getStatusBadge(device.status),
  },
  {
    title: <HeaderCell title="Under maintenance" />,
    dataIndex: 'maintaining_quantity',
    key: 'maintaining_quantity',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => device.maintaining_quantity,
  },
  {
    title: <>Action</>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, serviceDeviceDetail: ServiceDeviceDetail) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit this record'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                quantity: Number(serviceDeviceDetail.quantity),
                device: serviceDeviceDetail.device_active,
                maintaining_quantity: Number(serviceDeviceDetail.maintaining_quantity),
                status: serviceDeviceDetail.status,
              };
              openModal({
                view: <EditServiceDeviceDetail device={data} active={serviceDeviceDetail.active} />,
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
      </div>
    ),
  },
];