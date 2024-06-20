'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import CreateShiftDetail from '@/app/shared/shift_details/create-shift-detail';
import ShiftDetailsTable from '@/app/shared/shift_details/shift-details-table/index';
const pageHeader = {
  title: 'Shift Details',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Shift Details',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Shift Detail" view={<CreateShiftDetail />} customSize="600px" className="mt-0" />
      </PageHeader>
      <ShiftDetailsTable />
    </>
  );
}
