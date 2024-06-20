'use client';
import PageHeader from '@/app/shared/page-header';
import ShiftDetailStaffTable from '@/app/shared/shift_detail_staff/schedule/index';
const pageHeader = {
  title: 'Schedule',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Schedule',
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
