'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ShiftDetailStaffTable from '@/app/[locale]/shared/shift_detail_staff/schedule/index';
import { useTranslations } from 'next-intl';
export default function BlankPage() {
  const t = useTranslations('schedule');
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <ShiftDetailStaffTable />
    </>
  );
}
