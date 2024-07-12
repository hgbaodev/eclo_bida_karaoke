'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import ProductsTable from '@/app/[locale]/shared/product_imports/product_import_table';
import CreateProduct from '@/app/[locale]/shared/product_imports/create-product_import';
import { useTranslations } from 'next-intl';


export default function BlankPage() {
  const t = useTranslations('product_import');
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
        <ModalButton label={t('add_import')} view={<CreateProduct />} customSize="600px" className="mt-0" />
      </PageHeader>
      <ProductsTable />
    </>
  );
}
