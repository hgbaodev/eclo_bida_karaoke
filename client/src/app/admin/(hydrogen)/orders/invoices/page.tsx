'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import CreateUser from '@/app/shared/users/create-user';
import RoomAndTablesTable from '@/app/shared/tableandrooms/tableandrooms-table';
import CreateTableAndRoom from '@/app/shared/tableandrooms/create-tableandroom';

const pageHeader = {
  title: 'Invoices',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Invoices',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <RoomAndTablesTable />
    </>
  );
}
