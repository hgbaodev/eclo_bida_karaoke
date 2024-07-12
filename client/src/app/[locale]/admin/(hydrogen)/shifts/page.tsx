'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreateShift from '@/app/[locale]/shared/shift/create-shift';
import ShiftsTable from '@/app/[locale]/shared/shift/shifts-table';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('shift');
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
        <ModalButton label={t('add_shift')} view={<CreateShift />} customSize="600px" className="mt-0" />
      </PageHeader>
      <ShiftsTable />
    </>
  );
}
