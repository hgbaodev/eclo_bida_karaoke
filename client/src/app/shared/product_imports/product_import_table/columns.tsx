'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteProduct,getProducts } from '@/store/slices/productSlices';
import toast from 'react-hot-toast';
import EditProduct from '../edit-product_import';

export const getColumns = (openModal: (args: any) => void) => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any,  product_import: Product_Import, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Create Time" />,
    dataIndex: 'create_time',
    key: 'create_time',
    width: 50,
    render: (_: string,  product_import: Product_Import) => product_import.create_time,
  },
  {
    title: <HeaderCell title="Receive Time" />,
    dataIndex: 'receive_time',
    key: 'receive_time',
    width: 100,
    render: (_: number,  product_import: Product_Import) => product_import.receive_time,
  },
  {
    title: <HeaderCell title="Total Cost" />,
    dataIndex: 'total_cost',
    key: 'total_cost',
    width: 50,
    render: (_: number, product_import: Product_Import) => product_import.total_cost,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 50,
    render: (_: string,  product_import: Product_Import) => product_import.status,
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, product_import: Product_Import) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Staff'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                create_time: product_import.create_time,
                receive_time: product_import.receive_time,
                total_cost: product_import.total_cost,
                status: product_import.status,
              };
              openModal({
                // view: <EditProduct product_import={data} active={product_import.active} />,
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
          description={`Are you sure you want to delete this #${product.name} staff?`}
          onDelete={async () => {
            const result = await dispatch(deleteProduct(product.active)); // Remove the .then() block
            if (deleteProduct.fulfilled.match(result)) {
              await dispatch(getProducts({ page: 1, pageSize: 5, query: ''}));
              toast.success(`Staff #${product.name} has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete staff #${product.active}.`);
            }
          }}
        /> */}
      </div>
    ),
  },
];

// export interface Product {
//     active: string;
//     name: string;
//     cost_price: string;
//     selling_price: string;
//     quantity: string;
   
//   }
  export interface Product_Import {
    active: string;
    receive_time: string;
    create_time: string;
    total_cost: string;
    status: string;
  }
