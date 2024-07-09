'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreateShift from '@/app/[locale]/shared/shift/create-shift';
import ShiftsTable from '@/app/[locale]/shared/shift/shifts-table';
const pageHeader = {
  title: 'Shifts',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Shifts',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Shift" view={<CreateShift />} customSize="600px" className="mt-0" />
      </PageHeader>
      <ShiftsTable />
    </>
  );
}
