'use client';
import PageHeader from '@/app/shared/page-header';
import { Text } from 'rizzui';

const pageHeader = {
  title: 'Order',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Order',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="grid grid-cols-2 space-x-2">
        <div className="flex flex-col">
          <Text>Danh sách sản phẩm</Text>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between">
              <Text>1. Cà phê đen</Text>
              <Text>1</Text>
            </div>
            <div className="flex justify-between">
              <Text>2. Cà phê sữa</Text>
              <Text>2</Text>
            </div>
          </div>
        </div>
        <div>Thông tin hoá đơn</div>
      </div>
    </>
  );
}
