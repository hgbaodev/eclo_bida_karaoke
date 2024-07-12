'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreateStaff from '@/app/[locale]/shared/staffs/create-staff';
import StaffsTable from '@/app/[locale]/shared/staffs/staffs-table';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';

export default function BlankPage() {
  const t = useTranslations('staffs');
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

  const check = useCheckPermissions('staff.View');
  if (!check) {
    window.location.href = '/error/403';
  }
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label={t('add_new_staff')} view={<CreateStaff />} customSize="600px" className="mt-0" />
      </PageHeader>
      <StaffsTable />
    </>
  );
}
