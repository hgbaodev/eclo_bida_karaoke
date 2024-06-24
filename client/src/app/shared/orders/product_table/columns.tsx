'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import { IoAddCircleOutline } from 'react-icons/io5';

export const getColumns = () => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, product: Product, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Product name" />,
    dataIndex: 'name',
    key: 'name',
    width: 50,
    render: (_: string, product: Product) => product.name,
  },
  {
    title: <HeaderCell title="Selling Price" />,
    dataIndex: 'selling_price',
    key: 'selling_price',
    width: 50,
    render: (_: number, product: Product) => product.selling_price,
  },
  {
    title: <HeaderCell title="Quantity" />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 50,
    render: (_: string, product: Product) => product.quantity,
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, product: Product) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Add product'} placement="top" color="invert">
          <ActionIcon
            onClick={() => {}}
            as="span"
            size="sm"
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
          >
            <IoAddCircleOutline className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
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
  cost_price: string;
  selling_price: string;
  quantity: string;
}
