'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import ProductsTable from '@/app/shared/product_imports/product_import_table'
import CreateProduct from '@/app/shared/product_imports/create-product_import';

const pageHeader = {
  title: 'Product Import',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Product Imports',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Import" view={<CreateProduct />} customSize="600px" className="mt-0" />
      </PageHeader>
      <ProductsTable />
    </>
  );
}
