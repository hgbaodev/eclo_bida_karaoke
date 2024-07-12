import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import RolesGrid from '@/app/[locale]/shared/roles-permissions/roles-grid';
import CreateRole from '@/app/[locale]/shared/roles-permissions/create-role';
import { useTranslations } from 'next-intl';

export default function BlankPage() {
  const t = useTranslations('roles_permissions');

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
        <ModalButton label={t('add_a_new_role')} view={<CreateRole />} />
      </PageHeader>
      <RolesGrid />
    </>
  );
}
