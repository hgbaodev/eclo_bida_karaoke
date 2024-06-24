'use client';
import TableOrder from '@/app/shared/orders/table_order';
import PageHeader from '@/app/shared/page-header';
import ControlledTable from '@/components/controlled-table';
import { RootState } from '@/store/types';
import { formatDate } from '@/utils/format-date';
import { useSelector } from 'react-redux';
import { Button, Input, Popover, Text, Title } from 'rizzui';

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

export default function BlankPage({ params }: { params: { slug: string } }) {
  const { first_name, last_name } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="grid grid-cols-2 space-x-4 space-y-4">
        <div className="mt-[20px]">
          <Input placeholder="Search product ....." />
          <div className="flex flex-col">
            <Title as="h5" className="my-3">
              Danh sách sản phẩm
            </Title>
            <TableOrder />
          </div>
        </div>
        <div>
          <Title as="h5">Invoice information</Title>
          <Text>Code Invoice: {params.slug}</Text>
          <Text>Staff Name: {first_name + ' ' + last_name}</Text>
          <Text>Time: {formatDate(new Date())}</Text>
          <div className="mt-[100px] space-x-3 flex justify-end">
            <Button className="w-[80px]" color="primary">
              Order
            </Button>
            <Button className="w-[80px]" color="danger">
              Pay
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
