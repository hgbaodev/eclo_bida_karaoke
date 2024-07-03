'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import RoomAndTablesTable from '@/app/shared/tableandrooms/tableandrooms-table';
import CreateTableAndRoom from '@/app/shared/tableandrooms/create-tableandroom';

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
        <div className="flex flex-wrap gap-1">
          <ModalButton label="Add new" view={<CreateTableAndRoom />} customSize="600px" className="mt-0" />
        </div>
      </PageHeader>
      <RoomAndTablesTable />
    </>
  );
}
