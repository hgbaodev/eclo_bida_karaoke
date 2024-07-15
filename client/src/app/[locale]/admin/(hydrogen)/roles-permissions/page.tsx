'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import RolesGrid from '@/app/[locale]/shared/roles-permissions/roles-grid';
import CreateRole from '@/app/[locale]/shared/roles-permissions/create-role';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';
import WithPermission from '@/guards/with-permisson';

export default function BlankPage() {
  const t = useTranslations('roles_permissions');
  const check = useCheckPermissions('role.View');
  if (!check) {
    window.location.href = '/error/403';
  }
  const pageHeader = {
    title: t('title'),
    breadcrumb: [
      {
        href: '/admin',
        name: t('breadcrumb_analytics'),
      },
      {
        name: t('title'),
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <WithPermission permission="role.Create">
          <ModalButton label={t('add_a_new_role')} view={<CreateRole />} />
        </WithPermission>
      </PageHeader>
      <RolesGrid />
    </>
  );
}
