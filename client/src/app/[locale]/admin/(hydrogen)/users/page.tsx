'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import UsersTable from '@/app/[locale]/shared/users/users-table';
import CreateUser from '@/app/[locale]/shared/users/create-user';

const pageHeader = {
  title: 'Users',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Users',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New User" view={<CreateUser />} customSize="600px" className="mt-0" />
      </PageHeader>
      <UsersTable />
    </>
  );
}
