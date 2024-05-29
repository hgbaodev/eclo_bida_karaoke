'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import {  getProducts } from '@/store/slices/productSlices';
import toast from 'react-hot-toast';
// import EditStaff from '../edit-staff';

export const getColumns = (openModal: (args: any) => void) => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any,  product: Product, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Product name" />,
    dataIndex: 'name',
    key: 'name',
    width: 50,
    render: (_: string,  product: Product) => product.name,
  },
  {
    title: <HeaderCell title="Cost Price" />,
    dataIndex: 'cost_price',
    key: 'cost_price',
    width: 100,
    render: (_: string,  product: Product) => product.cost_price,
  },
  {
    title: <HeaderCell title="Selling Price" />,
    dataIndex: 'selling_price',
    key: 'selling_price',
    width: 50,
    render: (_: string,  product: Product) => product.selling_price,
  },
  {
    title: <HeaderCell title="Quantity" />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 50,
    render: (_: string,  product: Product) => product.quantity,
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, product: Product) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Staff'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                product_name: product.name,
                cost_price: product.cost_price,
                selling_price: product.selling_price,
                quantity: product.quantity,
                unit: product.unit,
              };
              openModal({
                // view: <EditStaff staff={data} active={staff.active} />,
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
        {/* <DeletePopover
          title={`Delete this user`}
          description={`Are you sure you want to delete this #${staff.name} staff?`}
          onDelete={async () => {
            const result = await dispatch(deleteStaff(staff.active)); // Remove the .then() block
            if (deleteStaff.fulfilled.match(result)) {
              await dispatch(getStaffs({ page: 1, pageSize: 5, query: '', position: '' }));
              toast.success(`Staff #${staff.name} has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete staff #${staff.active}.`);
            }
          }}
        /> */}
      </div>
    ),
  },
];

// export interface Staff {
//   active: string;
//   name: string;
//   phone: string;
//   image: string;
//   idcard: string;
//   birthday: string;
//   address: string;
//   position: {
//     name: string;
//     active: string;
//   };
//   created_at: string;
// }
export interface Product {
    active: string;
    name: string;
    description: string;
    cost_price: string;
    selling_price: string;
    quantity: string;
    unit: string;
  }
