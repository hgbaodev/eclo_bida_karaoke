'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';

import CustomerTable from '@/app/shared/customers/customers-table';
import CreateCustomer from '@/app/shared/customers/create-customer';

const pageHeader = {
  title: 'Customers',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Customers',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add a new customer" view={<CreateCustomer />} customSize="600px" className="mt-0" />
      </PageHeader>
      <CustomerTable />
    </>
  );
}
