'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import ServiceTypesTable from '@/app/shared/service_types/service_types-table';
// import CreateSerivceType from '@/app/shared/service_types/create-service_type';

const pageHeader = {
  title: 'Service Types',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Service Types',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ModalButton label="Add A New Type" view={<CreateSerivceType />} customSize="600px" className="mt-0" /> */}
      </PageHeader>
      <ServiceTypesTable />
    </>
  );
}
