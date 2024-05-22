'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import UsersTable from '@/app/shared/users/users-table';
import CreateUser from '@/app/shared/users/create-user';

const pageHeader = {
  title: 'Table & Rooms',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Table & Rooms',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add new table/room" view={<CreateUser />} customSize="600px" className="mt-0" />
      </PageHeader>
      <UsersTable />
    </>
  );
}
