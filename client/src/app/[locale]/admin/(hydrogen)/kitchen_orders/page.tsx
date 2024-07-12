'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import KitchenOrdersTable from '@/app/[locale]/shared/kitchen_orders/kitchen_orders-table';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';

export default function BlankPage() {
  const t = useTranslations('kitchen_orders');
  const check = useCheckPermissions('kitchenorder.View');
  if (!check) {
    window.location.href = '/error/403';
  }
  const pageHeader = {
    title: t('title'),
    breadcrumb: [
      {
        href: '/admin',
        name: t('analytics'),
      },
      {
        name: t('title'),
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
