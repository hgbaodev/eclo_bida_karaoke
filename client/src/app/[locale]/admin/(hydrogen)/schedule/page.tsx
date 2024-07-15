'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ShiftDetailStaffTable from '@/app/[locale]/shared/shift_detail_staff/schedule/index';
import useCheckPermissions from '@/hooks/use-check-permission';
import { useTranslations } from 'next-intl';
export default function BlankPage() {
  const t = useTranslations('schedule');
  const check = useCheckPermissions('schedule.View');
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <ShiftDetailStaffTable />
    </>
  );
}
