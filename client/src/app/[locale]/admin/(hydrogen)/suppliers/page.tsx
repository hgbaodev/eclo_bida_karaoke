'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import { useTranslations } from 'next-intl';

import SuppliersTable from '@/app/[locale]/shared/suppliers/suppliers-table';
import CreateSupplier from '@/app/[locale]/shared/suppliers/create-supplier';
export default function BlankPage() {
  const t = useTranslations('suppliers');

  return (
    <>
      <PageHeader
        title={t('title')}
        breadcrumb={[
          {
            href: '/admin',
            name: t('breadcrumb_analytics'),
          },
          {
            name: t('title'),
          },
        ]}
      >
        <ModalButton label={t('add_new_supplier')} view={<CreateSupplier />} customSize="600px" className="mt-0" />
      </PageHeader>
      <SuppliersTable />
    </>
  );
}
