'use client';

import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import env from '@/env';
import DeletePopover from '@/app/[locale]/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteProduct, getProducts } from '@/store/slices/productSlices';
import toast from 'react-hot-toast';
// import EditProductImportDetail from '@/app/[locale]/shared/product_imports/edit-product_import_detail';
import WithPermission from '@/guards/with-permisson';
export const getColumns = (openModal: (args: any) => void, t: any) => [
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
    title: <HeaderCell title={t('quantity')} />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 50,
    render: (_: string, product_detail: Product_Detail) => product_detail.quantity,
  },
  // {
  //   title: <HeaderCell title={t('supplier')} />,
  //   dataIndex: 'supplier',
  //   key: 'supplier',
  //   width: 50,
  //   render: (_: string, product_detail: Product_Detail) => product_detail.supplier_detail.name,
  // },
  // {
  //   title: <></>,
  //   dataIndex: 'action',
  //   key: 'action',
  //   width: 10,
  //   render: (_: string, product_detail: Product_Detail) => (
  //     <div className="flex items-center justify-end gap-3 pe-3">
  //         <Tooltip size="sm" content={t('edit_product')} placement="top" color="invert">
  //           <ActionIcon
  //             onClick={() => {
  //               const data = {
  //                 name: product_detail.product.name,
  //                 cost_price: product_detail.cost_price,
  //                 quantity: product_detail.quantity,
                 
  //               };
  //               openModal({
  //                 view: <EditProductImportDetail product_detail={data} active={product_detail.active} />,
  //               });
  //             }}
  //             as="span"
  //             size="sm"
  //             variant="outline"
  //             className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
  //           >
  //             <PencilIcon className="h-4 w-4" />
  //           </ActionIcon>
  //         </Tooltip>
  //     </div>
  //   ),
  // },
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
