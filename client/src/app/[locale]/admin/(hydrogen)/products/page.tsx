'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import ProductsTable from '@/app/[locale]/shared/products/product_table';
import CreateProduct from '@/app/[locale]/shared/products/create-product';

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Products',
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
