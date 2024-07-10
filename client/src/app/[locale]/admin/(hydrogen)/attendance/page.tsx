'use client';
import AttendanceTable from '@/app/[locale]/shared/attendance';
import CreateAttendance from '@/app/[locale]/shared/attendance/create-attendance';
import CreateDayOff from '@/app/[locale]/shared/dayoff/create-dayoff';
import ModalButton from '@/app/[locale]/shared/modal-button';
import PageHeader from '@/app/[locale]/shared/page-header';
const pageHeader = {
  title: 'Attendace',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Attendace',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Attendance" view={<CreateAttendance />} customSize="600px" className="mt-0" />
        <ModalButton label="Day Off" view={<CreateDayOff />} customSize="600px" className="mt-0" />
      </PageHeader>
      <AttendanceTable />
    </>
  );
}
