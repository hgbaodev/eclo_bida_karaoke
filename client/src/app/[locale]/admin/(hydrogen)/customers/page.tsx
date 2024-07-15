'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreateCustomer from '@/app/[locale]/shared/customers/create-customer';
import CustomersTable from '@/app/[locale]/shared/customers/customers-table';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';
import WithPermission from '@/guards/with-permisson';

export default function BlankPage() {
  const t = useTranslations('customers');
  const check = useCheckPermissions('customer.View');
  if (!check) {
    window.location.href = '/error/403';
  }
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
        <WithPermission permission="customer.Create">
          <ModalButton label={t('add_a_new_customer')} view={<CreateCustomer />} customSize="600px" className="mt-0" />
        </WithPermission>
      </PageHeader>
      <CustomersTable />
    </>
  );
}
