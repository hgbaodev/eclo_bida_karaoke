'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import RoomAndTablesTable from '@/app/[locale]/shared/tableandrooms/tableandrooms-table';
import CreateTableAndRoom from '@/app/[locale]/shared/tableandrooms/create-tableandroom';

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
