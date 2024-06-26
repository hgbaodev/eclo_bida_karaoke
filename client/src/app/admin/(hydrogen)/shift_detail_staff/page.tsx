'use client';
import PageHeader from '@/app/shared/page-header';
import ShiftDetailStaffTable from '@/app/shared/shift_detail_staff/index';
const pageHeader = {
  title: 'Shift Details For Staff',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Shift Details For Staff',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <ShiftDetailStaffTable />
    </>
  );
}
