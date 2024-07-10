'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import KitchenOrdersTable from '@/app/[locale]/shared/kitchen_orders/kitchen_orders-table';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('kitchen_orders');
  const pageHeader = {
    title: t('order_requests'),
    breadcrumb: [
      {
        href: '/admin',
        name: t('analytics'),
      },
      {
        name: t('order_requests'),
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <KitchenOrdersTable />
    </>
  );
}
