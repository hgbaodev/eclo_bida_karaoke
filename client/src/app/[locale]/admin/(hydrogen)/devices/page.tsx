'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import DevicesTable from '@/app/[locale]/shared/devices/devices-table';
import CreateDevice from '@/app/[locale]/shared/devices/create-device';
import { useTranslations } from 'next-intl';

const pageHeader = {
  title: 'Devices',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Devices',
    },
  ],
};

export default function BlankPage() {
  const t = useTranslations('Index');
  return (
    <>
      <h1>{t('title')}</h1>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Device" view={<CreateDevice />} customSize="600px" className="mt-0" />
      </PageHeader>
      <DevicesTable />
    </>
  );
}
