'use client';
import PageHeader from '@/app/[locale]/shared/page-header';

import KitchenOrdersTable from '@/app/[locale]/shared/kitchen_orders/kitchen_orders-table';

const pageHeader = {
  title: 'Order requests',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'OrderRequests',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <KitchenOrdersTable />
    </>
  );
}
