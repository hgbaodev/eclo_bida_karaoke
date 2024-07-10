'use client';
import DayOff_table from '@/app/[locale]/shared/dayoff/dayoff_table';
import CreateDayOff from '@/app/[locale]/shared/dayoff/create-dayoff';
import ModalButton from '@/app/[locale]/shared/modal-button';
import PageHeader from '@/app/[locale]/shared/page-header';
const pageHeader = {
  title: 'DayOff',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'DayOff',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="DayOff" view={<CreateDayOff />} customSize="600px" className="mt-0" />
      </PageHeader>
      <DayOff_table />
    </>
  );
}
