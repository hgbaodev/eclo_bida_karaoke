'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreatePosition from '@/app/[locale]/shared/positions/create-position';
import PositionsTable from '@/app/[locale]/shared/positions/positions-table';
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
