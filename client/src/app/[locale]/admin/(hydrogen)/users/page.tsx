'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import UsersTable from '@/app/[locale]/shared/users/users-table';
import CreateUser from '@/app/[locale]/shared/users/create-user';
import WithPermission from '@/guards/with-permisson';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';

export default function BlankPage() {
  const t = useTranslations('users');
  const check = useCheckPermissions('user.View');
  if (!check) {
    window.location.href = '/error/403';
  }

  return (
    <>
      <PageHeader
        title={t('title')}
        breadcrumb={[
          {
            href: '/admin',
            name: t('breadcrumb_analytics'),
          },
          {
            name: t('title'),
          },
        ]}
      >
        <WithPermission permission="user.Create">
          <ModalButton label={t('add_new_user')} view={<CreateUser />} customSize="600px" className="mt-0" />
        </WithPermission>
      </PageHeader>
      <UsersTable />
    </>
  );
}
