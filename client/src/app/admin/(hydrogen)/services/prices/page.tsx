'use client';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';

import PricesTable from '@/app/shared/prices/prices-table';
import CreatePrice from '@/app/shared/prices/create-price';

const pageHeader = {
  title: 'Prices setting',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Prices setting',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add a new price" view={<CreatePrice />} customSize="600px" className="mt-0" />
      </PageHeader>
      <PricesTable />
    </>
  );
}
