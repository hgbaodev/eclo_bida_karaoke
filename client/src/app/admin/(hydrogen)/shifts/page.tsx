'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import CreateShift from '@/app/shared/shift/create-shift';
import ShiftsTable from '@/app/shared/shift/shifts-table';
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
