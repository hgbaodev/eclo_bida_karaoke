'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreateStaff from '@/app/[locale]/shared/staffs/create-staff';
import StaffsTable from '@/app/[locale]/shared/staffs/staffs-table';
const pageHeader = {
  title: 'Staffs',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Staffs',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Staff" view={<CreateStaff />} customSize="600px" className="mt-0" />
      </PageHeader>
      <StaffsTable />
    </>
  );
}