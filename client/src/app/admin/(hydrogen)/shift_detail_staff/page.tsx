'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import ShiftDetailStaffTable from '@/app/shared/shift_detail_staff/index';
import CreateWorkShift from '@/app/shared/shift_detail_staff/work_shift/create-work_shift';
const pageHeader = {
  title: 'Shift Details Of Staff',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Shift Details Of Staff',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Copy" view={<CreateWorkShift />} customSize="600px" className="mt-0" />
      </PageHeader>
      <ShiftDetailStaffTable />
    </>
  );
}
