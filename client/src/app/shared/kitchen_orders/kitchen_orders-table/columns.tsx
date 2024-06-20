'use client';

import { HeaderCell } from '@/components/ui/table';
import AvatarCard from '@/components/ui/avatar-card';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import { kitchenOrder } from '../types';

export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;

export const getColumns = (openModal: (args: any) => void) => {
  return [
    {
      title: <HeaderCell title="No." key="header-no" />,
      dataIndex: 'no.',
      key: 'no.',
      width: 50,
      render: (_: any, kitchenOrder: kitchenOrder, index: number) => (
        <div className="inline-flex ps-3">{index + 1}</div>
      ),
    },
    {
      title: <HeaderCell title="Name" />,
      dataIndex: 'name',
      key: 'name',
      width: 50,
      render: (_: string, kitchenOrder: kitchenOrder) => kitchenOrder.product_name,
    },
    {
      title: <HeaderCell title="Quantity" />,
      dataIndex: 'quantity',
      key: 'quantity',
      width: 50,
      render: (_: string, kitchenOrder: kitchenOrder) => kitchenOrder.quantity,
    },
    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 10,
      render: (_: string, kitchenOrder: kitchenOrder) => (
        <div className="flex items-center justify-end gap-3 pe-3">
          <Tooltip size="sm" content={'Edit Customer'} placement="top" color="invert">
            <ActionIcon
              onClick={() => {
                const data = {
                  name: kitchenOrder.product_name,
                  status: kitchenOrder.status,
                };
                // openModal({
                //   view: <EditServiceType service_type={data} active={serviceType.active} />,
                // });
              }}
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
          {/* <DeletePopover
            title={`Delete this service type`}
            description={`Are you sure you want to delete this #${kitchenOrder.product_name} product?`}
            onDelete={async () => {
              const result = await dispatch(deleteServiceType(serviceType.active)); // Remove the .then() block
              if (deleteServiceType.fulfilled.match(result)) {
                await dispatch(getServiceTypes({ page: 1, pageSize: 5, query: '', status: '' }));
                toast.success(`Service type #${serviceType.name} has been deleted successfully.`);
              } else {
                toast.error(`Failed to delete service type #${serviceType.active}.`);
              }
            }}
          /> */}
        </div>
      ),
    },
  ];
};
