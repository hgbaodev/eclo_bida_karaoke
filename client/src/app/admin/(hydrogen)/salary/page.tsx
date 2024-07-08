'use client';
import SalaryTable from '@/app/shared/salary';
import PageHeader from '@/app/shared/page-header';
import CreateSalary from '@/app/shared/salary/create-salary';
import ModalButton from '@/app/shared/modal-button';
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Create New Salaries" view={<CreateSalary />} customSize="600px" className="mt-0" />
      </PageHeader>
      <SalaryTable />
    </>
  );
}
