'use client';
import SalaryTable from '@/app/[locale]/shared/salary';
import PageHeader from '@/app/[locale]/shared/page-header';
import CreateSalary from '@/app/[locale]/shared/salary/create-salary';
import ModalButton from '@/app/[locale]/shared/modal-button';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';
import WithPermission from '@/guards/with-permisson';

export default function BlankPage() {
  const t = useTranslations('salary');
  const check = useCheckPermissions('salary.View');
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
        <WithPermission permission="salary.Create">
          <ModalButton label={t('add_salary')} view={<CreateSalary />} customSize="600px" className="mt-0" />
        </WithPermission>
      </PageHeader>
      <SalaryTable />
    </>
  );
}
