'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreatePosition from '@/app/[locale]/shared/positions/create-position';
import PositionsTable from '@/app/[locale]/shared/positions/positions-table';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('position');
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
        <ModalButton label={t('add_position')} view={<CreatePosition />} customSize="600px" className="mt-0" />
      </PageHeader>
      <PositionsTable />
    </>
  );
}
