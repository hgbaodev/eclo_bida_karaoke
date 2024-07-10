'use client';

import LoggersTable from '@/app/[locale]/shared/loggers';
import PageHeader from '@/app/[locale]/shared/page-header';

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
