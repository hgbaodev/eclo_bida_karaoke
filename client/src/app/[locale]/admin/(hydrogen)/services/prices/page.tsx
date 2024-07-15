'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import PricesTable from '@/app/[locale]/shared/prices/prices-table';
import CreatePrice from '@/app/[locale]/shared/prices/create-price';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';
import WithPermission from '@/guards/with-permisson';

export default function BlankPage() {
  const t = useTranslations('price');
  const check = useCheckPermissions('price.View');
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <WithPermission permission="price.Create">
          <ModalButton label={t('add')} view={<CreatePrice />} customSize="600px" className="mt-0" />
        </WithPermission>
      </PageHeader>
      <PricesTable />
    </>
  );
}
