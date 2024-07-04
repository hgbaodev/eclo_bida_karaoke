'use client';
import SalaryTable from '@/app/shared/salary';
import PageHeader from '@/app/shared/page-header';
const pageHeader = {
  title: 'Salary',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Salary',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <SalaryTable />
    </>
  );
}
