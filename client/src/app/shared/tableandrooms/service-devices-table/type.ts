export enum ServiceDeviceStatusEnum {
  IN_USE = 'in_use',
  AVAILABLE = 'available',
  MAINTENANCE = 'maintenance',
  OUT_OF_ORDER = 'out_of_order',
}

export const statusOptions = [
  {
    value: ServiceDeviceStatusEnum.IN_USE,
    label: 'In Use',
  },
  {
    value: ServiceDeviceStatusEnum.AVAILABLE,
    label: 'Available',
  },
  {
    value: ServiceDeviceStatusEnum.MAINTENANCE,
    label: 'Maintenance',
  },
  {
    value: ServiceDeviceStatusEnum.OUT_OF_ORDER,
    label: 'Out of Order',
  },
];
