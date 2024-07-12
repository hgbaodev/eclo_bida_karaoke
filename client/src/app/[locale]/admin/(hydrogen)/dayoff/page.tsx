'use client';
import DayOff_table from '@/app/[locale]/shared/dayoff/dayoff_table';
import CreateDayOff from '@/app/[locale]/shared/dayoff/create-dayoff';
import ModalButton from '@/app/[locale]/shared/modal-button';
import PageHeader from '@/app/[locale]/shared/page-header';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';
import WithPermission from '@/guards/with-permisson';

export default function BlankPage() {
  const t = useTranslations('dayoff');
  const check = useCheckPermissions('dayoff.View');
  if (!check) {
    window.location.href = '/error/403';
  }
  const pageHeader = {
    title: t('title'),
    breadcrumb: [
      {
        href: '/admin',
        name: t('analytics'),
      },
      {
        name: t('title'),
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <WithPermission permission="dayoff.Create">
          <ModalButton label={t('add_dayoff')} view={<CreateDayOff />} customSize="600px" className="mt-0" />
        </WithPermission>
      </PageHeader>
      <DayOff_table />
    </>
  );
}
