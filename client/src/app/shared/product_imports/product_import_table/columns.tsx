'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import { PiPlusBold } from 'react-icons/pi';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteProduct,getProductImports } from '@/store/slices/product_importSlice';
import toast from 'react-hot-toast';
import EditProduct from '../edit-product_import';
import EditProduct_Detail from '../create-product_import_detail';
import Link from 'next/link';
import { act } from 'react';

export  function getStatusBadge(status: Product_Import['status']) {
  switch (status) {
    case STATUSES.Canceled:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Canceled</Text>
        </div>
      );
    case STATUSES.Completed:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Completed</Text>
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
    render: (status: Product_Import['status']) => getStatusBadge(status),
  },
  {
    title: <HeaderCell title="Product" />,
    // dataIndex: 'status',
    // key: 'status',
    // width: 50,
    // render: (status: Product_Import['status']) => getStatusBadge(status),
    dataIndex: 'action',
    key: 'action',
    width: 50,
    render: (_: string, product_import: Product_Import) => (
      <div className="flex">
        <Tooltip size="sm" content={'See product'} placement="top" color="invert">
        <Link href={{
            pathname: '/admin/product_import_details',
            query: { active: product_import.active }
          }}>
          
            <ActionIcon
              size="sm"
              variant="outline"
              className="inline-flex items-center"
              
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
         
        </Link>
        {/* <Link href={{
            pathname: '/admin/product_import_details',
            query: { active: product_import.active }
          }}>
        <ActionIcon
            onClick={() => {
              const data = {
                create_time: product_import.create_time,
                receive_time: product_import.receive_time,
                total_cost: product_import.total_cost,
                status: product_import.status,
              };
              openModal({
                view: <EditProduct product_import={data} active={product_import.active} />,
              });
            }}
            as="span"
            size="sm"
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
          </Link> */}
      </Tooltip>
        </div>
    )
  },

  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, product_import: Product_Import) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit Import'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                create_time: product_import.create_time,
                receive_time: product_import.receive_time,
                total_cost: product_import.total_cost,
                status: product_import.status,
              };
              openModal({
                view: <EditProduct product_import={data} active={product_import.active} />,
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
        {/* <Tooltip size="sm" content={'Import product'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                create_time: product_import.create_time,
                receive_time: product_import.receive_time,
                total_cost: product_import.total_cost,
                status: product_import.status,
              };
              openModal({
                view: <EditProduct_Detail product_import={data} active={product_import.active} />,
              });
            }}
            as="span"
            size="sm"
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
          >
            <PiPlusBold className="h-4 w-4" />
          </ActionIcon>
        </Tooltip> */}
        <DeletePopover
          title={`Delete this user`}
          description={`Are you sure you want to delete this import `}
          onDelete={async () => {
            const result = await dispatch(deleteProduct(product_import.active)); // Remove the .then() block
            if (deleteProduct.fulfilled.match(result)) {
              await dispatch(getProductImports({ page: 1, pageSize: 5, query: ''}));
              toast.success(`Import  has been deleted successfully.`);
            } else {
              toast.error(`Failed to delete import #${product_import.active}.`);
            }
          }}
        />
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
  export const STATUSES = {
    Completed: 'A',
    Canceled: 'D',
  } as const; 