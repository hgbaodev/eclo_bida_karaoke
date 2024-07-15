'use client';
import AttendanceTable from '@/app/[locale]/shared/attendance';
import CreateAttendance from '@/app/[locale]/shared/attendance/create-attendance';
import CreateDayOff from '@/app/[locale]/shared/dayoff/create-dayoff';
import ModalButton from '@/app/[locale]/shared/modal-button';
import PageHeader from '@/app/[locale]/shared/page-header';
import WithPermission from '@/guards/with-permisson';
import useCheckPermissions from '@/hooks/use-check-permission';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('attendance');
  const check = useCheckPermissions('attendance.View');
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
        <WithPermission permission="attendance.Create">
          <ModalButton label={t('attendance')} view={<CreateAttendance />} customSize="600px" className="mt-0" />
          <ModalButton label={t('day_off')} view={<CreateDayOff />} customSize="600px" className="mt-0" />
        </WithPermission>
      </PageHeader>
      <div className="mb-4 flex items-center space-x-4">
        <p className="text-sm text-green-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-green-600 mr-2 rounded-full"></span>
          {t('approved')}
        </p>
        <p className="text-sm text-red-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-red-600 mr-2 rounded-full"></span>
          {t('unapproved')}
        </p>
      </div>
      <AttendanceTable />
    </>
  );
}
