'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import InvoicesTable from '@/app/[locale]/shared/orders/invoices/invoice-table';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('invoices');
  const pageHeader = {
    title: t('title'),
    breadcrumb: [
      {
        href: '/admin',
        name: t('breadcrumb_analytics'),
      },
      {
        name: t('title'),
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <InvoicesTable />
    </>
  );
}
