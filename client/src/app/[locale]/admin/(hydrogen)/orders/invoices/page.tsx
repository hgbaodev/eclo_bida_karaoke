'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import InvoicesTable from '@/app/[locale]/shared/orders/invoices/invoice-table';

const pageHeader = {
  title: 'Invoices',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Invoices',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <InvoicesTable />
    </>
  );
}