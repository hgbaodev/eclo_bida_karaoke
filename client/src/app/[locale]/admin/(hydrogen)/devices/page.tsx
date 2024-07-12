'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import DevicesTable from '@/app/[locale]/shared/devices/devices-table';
import CreateDevice from '@/app/[locale]/shared/devices/create-device';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('devices'); // Thay 'common' bằng file translation chứa các key tương ứng
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
        <ModalButton label={t('add_new_device')} view={<CreateDevice />} customSize="600px" className="mt-0" />
      </PageHeader>
      <DevicesTable />
    </>
  );
}
