'use client';
import AttendanceTable from '@/app/[locale]/shared/attendance';
import CreateAttendance from '@/app/[locale]/shared/attendance/create-attendance';
import CreateDayOff from '@/app/[locale]/shared/dayoff/create-dayoff';
import ModalButton from '@/app/[locale]/shared/modal-button';
import PageHeader from '@/app/[locale]/shared/page-header';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('attendance');
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
        <ModalButton label={t('attendance')} view={<CreateAttendance />} customSize="600px" className="mt-0" />
        <ModalButton label={t('day_off')} view={<CreateDayOff />} customSize="600px" className="mt-0" />
      </PageHeader>
      <AttendanceTable />
    </>
  );
}
