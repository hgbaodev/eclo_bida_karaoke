'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import RoomAndTablesTable from '@/app/[locale]/shared/tableandrooms/tableandrooms-table';
import CreateTableAndRoom from '@/app/[locale]/shared/tableandrooms/create-tableandroom';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('tables_rooms');
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
        <div className="flex flex-wrap gap-1">
          <ModalButton label={t('add')} view={<CreateTableAndRoom />} customSize="600px" className="mt-0" />
        </div>
      </PageHeader>
      <RoomAndTablesTable />
    </>
  );
}
