'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import ServiceTypesTable from '@/app/[locale]/shared/service_types/service_types-table';
import CreateSerivceType from '@/app/[locale]/shared/service_types/create-service_type';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('service_type');
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
        <ModalButton label={t('add')} view={<CreateSerivceType />} customSize="600px" className="mt-0" />
      </PageHeader>
      <ServiceTypesTable />
    </>
  );
}
