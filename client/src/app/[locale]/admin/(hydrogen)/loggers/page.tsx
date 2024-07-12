'use client';

import LoggersTable from '@/app/[locale]/shared/loggers';
import PageHeader from '@/app/[locale]/shared/page-header';
import { useTranslations } from 'next-intl';

const pageHeader = {
  title: 'title',
  breadcrumb: [
    {
      href: '/admin',
      name: 'breadcrumb_analytics',
    },
    {
      name: 'title',
    },
  ],
};

export default function BlankPage() {
  const t = useTranslations('loggers');

  return (
    <>
      <PageHeader
        title={t(pageHeader.title)}
        breadcrumb={pageHeader.breadcrumb.map((item) => ({ ...item, name: t(item.name) }))}
      ></PageHeader>
      <LoggersTable />
    </>
  );
}
