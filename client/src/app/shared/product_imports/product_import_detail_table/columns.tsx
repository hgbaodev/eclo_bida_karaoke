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
export const ProductImportDetails: React.FC = () => {
  const router = useRouter();
  const { active } = router.query;

  // Dữ liệu product_import_detail từ Redux
  const productImportDetails = useSelector((state: RootState) => state.product_import_detail.data);

  const [filteredDetails, setFilteredDetails] = useState<Product_Detail[]>([]);

  useEffect(() => {
    if (active) {
      // Lọc dữ liệu dựa trên `active`
      const details = productImportDetails.filter((detail: Product_Detail) => detail.active.toString() === active);
      setFilteredDetails(details);
      console.log(details)
    } else {
      setFilteredDetails(productImportDetails); // Hiển thị tất cả nếu `active` không có giá trị
    }
  }, [active, productImportDetails]);

  // Hàm để mở modal (ví dụ, có thể thay đổi tùy thuộc vào chức năng modal của bạn)
  const openModal = (record: Product_Detail) => {
    console.log("Mở modal với chi tiết sản phẩm:", record);
    // Gọi modal để hiển thị chi tiết hoặc thực hiện hành động khác
  };

  return (
    <div>
      <Table
        columns={getColumns(openModal)} // Lấy các cột từ hàm getColumns
        dataSource={filteredDetails} // Cung cấp dữ liệu đã lọc cho bảng
        rowKey="id" // Định danh duy nhất cho mỗi hàng
        onRow={(record) => ({
          onClick: () => openModal(record), // Gọi openModal khi nhấn vào hàng
        })}
        pagination={false} // Vô hiệu hóa phân trang nếu không cần
      />
    </div>
  );
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
];
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
  
  export default ProductImportDetails;