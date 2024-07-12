'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreateCustomer from '@/app/[locale]/shared/customers/create-customer';
import CustomersTable from '@/app/[locale]/shared/customers/customers-table';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('customers'); // Thay 'common' bằng file translation chứa các key tương ứng
  const pageHeader = {
    title: t('title'),
    breadcrumb: [
      {
        href: '/admin',
        name: t('breadcrumb_analytics'),
      },
      {
        name: t('title'),
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label={t('add_a_new_customer')} view={<CreateCustomer />} customSize="600px" className="mt-0" />
      </PageHeader>
      <CustomersTable />
    </>
  );
}
