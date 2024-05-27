'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import CreateStaff from '@/app/shared/staffs/create-staff';
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
    </>
  );
}
