'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import DevicesTable from '@/app/[locale]/shared/devices/devices-table';
import CreateDevice from '@/app/[locale]/shared/devices/create-device';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';
import WithPermission from '@/guards/with-permisson';

export default function BlankPage() {
  const t = useTranslations('devices');
  const check = useCheckPermissions('device.View');
  if (!check) {
    window.location.href = '/error/403';
  }
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
        <WithPermission permission="device.Create">
          <ModalButton label={t('add_new_device')} view={<CreateDevice />} customSize="600px" className="mt-0" />
        </WithPermission>
      </PageHeader>
      <DevicesTable />
    </>
  );
}
