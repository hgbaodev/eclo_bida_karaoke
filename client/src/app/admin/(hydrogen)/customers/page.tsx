'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';

import CustomerTable from '@/app/shared/customers/customers-table';


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
        {/* <ModalButton label="Add New User" view={<CreateUser />} customSize="600px" className="mt-0" /> */}
      </PageHeader>
      <CustomerTable />

    </>
  );
}
