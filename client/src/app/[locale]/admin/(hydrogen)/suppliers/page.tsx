'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';

import SuppliersTable from '@/app/[locale]/shared/suppliers/suppliers-table';
import CreateSupplier from '@/app/[locale]/shared/suppliers/create-supplier';

const pageHeader = {
  title: 'Suppliers',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Suppliers',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add a new supplier" view={<CreateSupplier />} customSize="600px" className="mt-0" />
      </PageHeader>
      <SuppliersTable />
    </>
  );
}
