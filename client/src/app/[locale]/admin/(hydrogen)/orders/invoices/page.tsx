'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import InvoicesTable from '@/app/[locale]/shared/orders/invoices/invoice-table';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';

export default function BlankPage() {
  const t = useTranslations('invoices');
  const check = useCheckPermissions('order.View');
  if (!check) {
    window.location.href = '/error/403';
  }
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
