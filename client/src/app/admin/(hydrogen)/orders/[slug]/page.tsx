'use client';
import PageHeader from '@/app/shared/page-header';
import { Title } from 'rizzui';

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
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="grid grid-cols-1">
        <div>My Post: {params.slug}</div>
        <Title>Hoá đơn</Title>
        <Title>Bàn 02</Title>
      </div>
    </>
  );
}
