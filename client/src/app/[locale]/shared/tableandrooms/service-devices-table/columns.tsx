'use client';

import { HeaderCell } from '@/components/ui/table';
import { Tooltip, ActionIcon } from 'rizzui';
import EditServiceDeviceDetail from '../edit-service-device-detail';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import PencilIcon from '@/components/icons/pencil';
import { getServiceDevicesDetail, deleteServiceDeviceDetail } from '@/store/slices/service_device_detailSlice';
import toast from 'react-hot-toast';
import { dispatch } from '@/store';
import StatusBadge from './status-badge';

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

export const getColumns = (openModal: (args: any) => void, t: any) => [
  {
    title: <HeaderCell title={t('no')} />,
    dataIndex: 'no.',
    key: 'no.',
    width: 50,
    render: (_: any, device: ServiceDeviceDetail, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('name')} />,
    dataIndex: 'deviceName',
    key: 'deviceName',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => device.device_name,
  },
  {
    title: <HeaderCell title={t('quantity')} />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => device.quantity,
  },
  {
    title: <HeaderCell title={t('value')} />,
    dataIndex: 'value',
    key: 'value',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => device.device_value,
  },
  {
    title: <HeaderCell title={t('status')} />,
    dataIndex: 'status',
    key: 'status',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => StatusBadge(device.status, t),
  },
  {
    title: <HeaderCell title={t('under_maintenance')} />,
    dataIndex: 'under_maintenance',
    key: 'under_maintenance',
    width: 50,
    render: (_: string, device: ServiceDeviceDetail) => device.maintenance_quantity,
  },
  {
    title: <HeaderCell title={t('action')} />,
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
                maintenance_quantity: Number(serviceDeviceDetail.maintenance_quantity),
                status: serviceDeviceDetail.status,
              };
              openModal({
                view: (
                  <EditServiceDeviceDetail
                    serviceActive={serviceDeviceDetail.service_active}
                    device={data}
                    active={serviceDeviceDetail.active}
                  />
                ),
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
          title={t('delete')}
          description={t('are_you_sure_to_delete')}
          onDelete={async () => {
            const result = await dispatch(deleteServiceDeviceDetail(serviceDeviceDetail.active)); // Remove the .then() block
            if (deleteServiceDeviceDetail.fulfilled.match(result)) {
              await dispatch(
                getServiceDevicesDetail({
                  page: 1,
                  pageSize: 5,
                  query: '',
                  status: '',
                  serviceActive: serviceDeviceDetail.service_active,
                }),
              );
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
