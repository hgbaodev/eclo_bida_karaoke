'use client';

import LoggersTable from '@/app/shared/loggers';
import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'Loggers',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Loggers',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <LoggersTable />
    </>
  );
}
