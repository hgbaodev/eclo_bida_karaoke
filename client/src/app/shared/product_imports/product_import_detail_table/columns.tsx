'use client';

// import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import ShoppingBagSolidIcon from '@/components/icons/shopping-bag-solid';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { dispatch } from '@/store';
import { deleteProduct,getProductImports } from '@/store/slices/product_importSlice';
import toast from 'react-hot-toast';
import EditProduct from '../edit-product_import';
import EditProduct_Detail from '../create-product_import_detail';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';

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
const ProductImportDetails = () => {
  const router = useRouter();
  const { active } = router.query;

  // Dữ liệu product_import_detail từ Redux
  const productImportDetails = useSelector((state: RootState) => state.product_import_detail.data);

  const [filteredDetails, setFilteredDetails] = useState([]);

  useEffect(() => {
    if (active) {
      // Lọc dữ liệu dựa trên `active`
      const details = productImportDetails.filter((detail: Product_Detail) => detail.active === active);
      setFilteredDetails(details);
    }
  }, [active, productImportDetails]);
}
export const getColumns = (openModal: (args: any) => void) => [
  {
    title: <HeaderCell title="Id" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any,  product_detail: Product_Detail, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title="Product name" />,
    dataIndex: 'name',
    key: 'name',
    width: 50,
    render: (_: string,  product_detail: Product_Detail) => product_detail.product.name,
  },
  {
    title: <HeaderCell title="Cost price" />,
    dataIndex: 'cost_price',
    key: 'cost_price',
    width: 100,
    render: (_: string,  product_detail: Product_Detail) => product_detail.cost_price,
  },
  {
    title: <HeaderCell title="Quantity" />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 50,
    render: (_: string, product_detail: Product_Detail) => product_detail.quantity,
  },
  {
    title: <HeaderCell title="Supplier" />,
    dataIndex: 'supplier_id',
    key: 'supplier_id',
    width: 50,
    render: (_: string, product_detail: Product_Detail) => product_detail.supplier_detail.name,
  },
  // {
  //   title: <HeaderCell title="Product" />,
  //   // dataIndex: 'status',
  //   // key: 'status',
  //   // width: 50,
  //   // render: (status: Product_Import['status']) => getStatusBadge(status),
  //   dataIndex: 'action',
  //   key: 'action',
  //   width: 50,
  //   render: (_: string, product_import: Product_Import) => (
  //     <div className="flex">
  //       <Tooltip size="sm" content={'Edit Import'} placement="top" color="invert">
  //       <Link href="/admin/products" passHref>
          
  //           <ActionIcon
  //             size="sm"
  //             variant="outline"
  //             className="inline-flex items-center"
  //           >
  //             <PencilIcon className="h-4 w-4" />
  //           </ActionIcon>
         
  //       </Link>
  //     </Tooltip>
  //       </div>
  //   )
  // },

  // {
  //   title: <></>,
  //   dataIndex: 'action',
  //   key: 'action',
  //   width: 10,
  //   render: (_: string, product_import: Product_Import) => (
  //     <div className="flex items-center justify-end gap-3 pe-3">
  //       <Tooltip size="sm" content={'Edit Import'} placement="top" color="invert">
  //         <ActionIcon
  //           onClick={() => {
  //             const data = {
  //               create_time: product_import.create_time,
  //               receive_time: product_import.receive_time,
  //               total_cost: product_import.total_cost,
  //               status: product_import.status,
  //             };
  //             openModal({
  //               view: <EditProduct product_import={data} active={product_import.active} />,
  //             });
  //           }}
  //           as="span"
  //           size="sm"
  //           variant="outline"
  //           className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
  //         >
  //           <PencilIcon className="h-4 w-4" />
  //         </ActionIcon>
  //       </Tooltip>
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
            <ShoppingBagSolidIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip> */}
        /* <DeletePopover
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
        /> */
  //     </div>
  //   ),
  // },
];

// export interface Product {
//     active: string;
//     name: string;
//     cost_price: string;
//     selling_price: string;
//     quantity: string;
   
//   }
// export interface Product_Import {
//     active: string;
//     receive_time: string;
//     create_time: string;
//     total_cost: string;
//     status: string;
//   }
//   export const STATUSES = {
//     Completed: 'A',
//     Canceled: 'D',
//   } as const; 
  export interface Product_Detail {
    active: string;
    product:{
      name:string
    }
    cost_price: string;
    quantity: string;
    supplier_detail:{
      name:string;
    } 
    import_detail:{
      name:string;
    };
  }
  
 