'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreateCustomer from '@/app/[locale]/shared/customers/create-customer';
import CustomersTable from '@/app/[locale]/shared/customers/customers-table';

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
      <CustomersTable />
    </>
  );
}
