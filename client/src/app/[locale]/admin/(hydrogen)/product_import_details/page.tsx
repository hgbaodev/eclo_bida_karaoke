'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import ProductsTable from '@/app/[locale]/shared/product_imports/product_import_detail_table';
import CreateProduct from '@/app/[locale]/shared/product_imports/create-product_import_detail';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';
import WithPermission from '@/guards/with-permisson';

export default function BlankPage() {
  const t = useTranslations('product_import_detail');
  const check = useCheckPermissions('product.View');
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <WithPermission permission="product.Create">
          <ModalButton label={t('add_detail')} view={<CreateProduct />} customSize="600px" className="mt-0" />
        </WithPermission>
      </PageHeader>
      <ProductsTable />
    </>
  );
}
