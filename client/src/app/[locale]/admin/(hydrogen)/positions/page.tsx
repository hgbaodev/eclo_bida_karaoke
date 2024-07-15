'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreatePosition from '@/app/[locale]/shared/positions/create-position';
import PositionsTable from '@/app/[locale]/shared/positions/positions-table';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';
import WithPermission from '@/guards/with-permisson';

export default function BlankPage() {
  const t = useTranslations('position');
  const check = useCheckPermissions('position.View');
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
        <WithPermission permission="position.Create">
          <ModalButton label={t('add_position')} view={<CreatePosition />} customSize="600px" className="mt-0" />
        </WithPermission>
      </PageHeader>
      <PositionsTable />
    </>
  );
}
