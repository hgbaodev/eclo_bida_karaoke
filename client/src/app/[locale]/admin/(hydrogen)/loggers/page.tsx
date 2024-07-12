'use client';

import LoggersTable from '@/app/[locale]/shared/loggers';
import PageHeader from '@/app/[locale]/shared/page-header';
import useCheckPermissions from '@/hooks/use-check-permission';
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
  const check = useCheckPermissions('logger.View');
  if (!check) {
    window.location.href = '/error/403';
  }

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
