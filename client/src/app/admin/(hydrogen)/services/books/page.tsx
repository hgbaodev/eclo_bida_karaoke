'use client';

import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import DevicesTable from '@/app/shared/devices';
import CreateDevice from '@/app/shared/devices/create-device';

const pageHeader = {
  title: 'Devices',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Books',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add Books" view={<CreateDevice />} customSize="600px" className="mt-0" />
      </PageHeader>
      <DevicesTable />
    </>
  );
}
