'use client';

import { Text, Badge } from 'rizzui';

export interface ServiceDeviceDetail {
  active: string;
  device_name: string;
  device_value: number;
  device_active: string;
  service_active: string;
  quantity: string;
  maintenance_quantity: string;
  status: any;
}

export enum ServiceDeviceStatusEnum {
  IN_USE = 'in_use',
  AVAILABLE = 'available',
  MAINTENANCE = 'maintenance',
  OUT_OF_ORDER = 'out_of_order',
}

export default function StatusBadge(status: ServiceDeviceStatusEnum, t: any) {
  switch (status) {
    case ServiceDeviceStatusEnum.IN_USE:
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="ms-2 font-medium text-blue-dark">{t('in_use')}</Text>
        </div>
      );
    case ServiceDeviceStatusEnum.AVAILABLE:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{t('available')}</Text>
        </div>
      );
    case ServiceDeviceStatusEnum.MAINTENANCE:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-yellow-600">{t('maintenance')}</Text>
        </div>
      );
    case ServiceDeviceStatusEnum.OUT_OF_ORDER:
      return (
        <div className="flex items-center">
          <Badge className="bg-gray-400" renderAsDot />
          <Text className="ms-2 font-medium text-gray-dark">{t('out_of_order')}</Text>
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
