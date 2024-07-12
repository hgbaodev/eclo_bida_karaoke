'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import ShoppingBagSolidIcon from '@/components/icons/shopping-bag-solid';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteProduct, getProductImports } from '@/store/slices/product_importSlice';
import toast from 'react-hot-toast';
import EditProduct from '../edit-product_import';
import EditProduct_Detail from '../create-product_import_detail';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { Table } from 'antd'; // Sử dụng Ant Design cho bảng
import type { ColumnsType } from 'antd/es/table';

// export  function getStatusBadge(status: Product_Import['status']) {
//   switch (status) {
//     case STATUSES.Canceled:
//       return (
//         <div className="flex items-center">
//           <Badge color="danger" renderAsDot />
//           <Text className="ms-2 font-medium text-red-dark">Canceled</Text>
//         </div>
//       );
//     case STATUSES.Completed:
//       return (
//         <div className="flex items-center">
//           <Badge color="success" renderAsDot />
//           <Text className="ms-2 font-medium text-green-dark">Completed</Text>
//         </div>
//       );
//     default:
//       return (
//         <div className="flex items-center">
//           <Badge renderAsDot className="bg-gray-400" />
//           <Text className="ms-2 font-medium text-gray-600">{status}</Text>
//         </div>
//       );
//   }
// }

export const getColumns = (openModal: (args: any) => void,t:any) => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, product_detail: Product_Detail, index: number) => (
      <div className="inline-flex ps-3">{index + 1}</div>
    ),
  },
  {
    title: <HeaderCell title={t('product_name')} />,
    dataIndex: 'product',
    key: 'product',
    width: 50,
    render: (_: string, product_detail: Product_Detail) => product_detail.product.name,
  },
  {
    title: <HeaderCell title={t('cost_price')} />,
    dataIndex: 'cost_price',
    key: 'cost_price',
    width: 100,
    render: (_: number, product_detail: Product_Detail) => product_detail.cost_price,
  },
  {
    title: <HeaderCell title={t('selling_price')}/>,
    dataIndex: 'selling_price',
    key: 'selling_price',
    width: 100,
    render: (_: number, product_detail: Product_Detail) => product_detail.selling_price,
  },
  {
    title: <HeaderCell title={t('quantity')} />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 50,
    render: (_: string, product_detail: Product_Detail) => product_detail.quantity,
  },
  {
    title: <HeaderCell title={t('supplier')} />,
    dataIndex: 'supplier',
    key: 'supplier',
    width: 50,
    render: (_: string, product_detail: Product_Detail) => product_detail.supplier_detail.name,
  },
];

export interface Product_Detail {
  active: string;
  product: {
    name: string;
  };
  cost_price: number;
  selling_price: number;
  quantity: string;
  supplier_detail: {
    name: string;
  };
  import_detail: {
    create_time: Date;
  };
}
