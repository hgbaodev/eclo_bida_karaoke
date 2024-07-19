'use client';

import { HeaderCell } from '@/components/ui/table';

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
    title: <HeaderCell title={t('selling_price')} />,
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
  // {
  //   title: <HeaderCell title={t('supplier')} />,
  //   dataIndex: 'supplier',
  //   key: 'supplier',
  //   width: 50,
  //   render: (_: string, product_detail: Product_Detail) => product_detail.supplier_detail.name,
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
  // supplier_detail: {
  //   name: string;
  // };
  import_detail: {
    create_time: Date;
  };
}
