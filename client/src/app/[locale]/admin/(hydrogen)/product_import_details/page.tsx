'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import ProductsTable from '@/app/[locale]/shared/product_imports/product_import_detail_table';
import CreateProduct from '@/app/[locale]/shared/product_imports/create-product_import_detail';

const pageHeader = {
  title: 'Product Import Detail',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Product Import Detail',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Product" view={<CreateProduct />} customSize="600px" className="mt-0" />
      </PageHeader>
      <ProductsTable />
    </>
  );
}
