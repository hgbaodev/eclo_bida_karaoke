'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import UsersTable from '@/app/shared/users/users-table';
import CreateUser from '@/app/shared/users/create-user';

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
        <ModalButton label="Add a new customer" view={<CreateUser />} customSize="600px" className="mt-0" />
      </PageHeader>
      <UsersTable />
    </>
  );
}
