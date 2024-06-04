'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import CreatePosition from '@/app/shared/positions/create-position';
import PositionsTable from '@/app/shared/positions/positions-table';
const pageHeader = {
  title: 'Positions',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Positions',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Position" view={<CreatePosition />} customSize="600px" className="mt-0" />
      </PageHeader>
      <PositionsTable />
    </>
  );
}
