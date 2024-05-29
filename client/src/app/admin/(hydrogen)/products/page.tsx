'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import ProductsTable from '@/app/shared/products/product_table'
// import CreateProduct from '@/app/shared/products/create-product';

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
        {/* <ModalButton label="Add New Product" view={<CreateProduct />} customSize="600px" className="mt-0" /> */}
      </PageHeader>
      <ProductsTable />
    </>
  );
}
