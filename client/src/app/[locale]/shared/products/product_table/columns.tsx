'use client';

// import { STATUSES, type User } from '@/data/users-data';
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
import EditProduct from '../edit-product';

export const getColumns = (openModal: (args: any) => void, t:any) => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, product: Product, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('image')} />,
    dataIndex: 'image',
    key: 'image',
    width: 50,
    render: (_: string, product: Product) => (
      <AvatarCard
        src={env.API_STORAGE + product.image}
        avatarProps={{
          name: product.name,
          size: 'lg',
          className: 'rounded-lg',
        }}
        name={''}
      />
    ),
  },
  {
    title: <HeaderCell title={t('product_name')} />,
    dataIndex: 'name',
    key: 'name',
    width: 50,
    render: (_: string, product: Product) => product.name,
  },
  {
    title: <HeaderCell title={t('product_type')} />,
    dataIndex: 'type',
    key: 'type',
    width: 100,
    render: (_: string, product: Product) => product.product_type.type_name,
  },
  {
    title: <HeaderCell title={t('selling_price')} />,
    dataIndex: 'selling_price',
    key: 'selling_price',
    width: 50,
    render: (_: number, product: Product) => product.selling_price,
  },
  {
    title: <HeaderCell title={t('quantity')} />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 50,
    render: (_: number, product: Product) => product.quantity,
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, product: Product) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={t('edit_product')} placement="top" color="invert">
          <ActionIcon
            onClick={() => {
              const data = {
                name: product.name,
                selling_price: product.selling_price,
                quantity: product.quantity,
                product_type: product.product_type.active,
              };
              openModal({
                view: <EditProduct product={data} active={product.active} />,
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
          description={t('delete_product')}
          onDelete={async () => {
            const result = await dispatch(deleteProduct(product.active)); // Remove the .then() block
            if (deleteProduct.fulfilled.match(result)) {
              await dispatch(getProducts({ page: 1, pageSize: 5, query: '',type:'' }));
              toast.success(t('success'));
            } else {
              toast.error(t('failed'));
            }
          }}
        />
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
  selling_price: number;
  quantity: number;
  image: string;
  product_type: {
    active: string;
    type_name: string;
  };
}
