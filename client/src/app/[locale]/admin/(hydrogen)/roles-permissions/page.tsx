import PageHeader from '@/app/[locale]/shared/page-header';
import ModalButton from '@/app/[locale]/shared/modal-button';
import RolesGrid from '@/app/[locale]/shared/roles-permissions/roles-grid';
import CreateRole from '@/app/[locale]/shared/roles-permissions/create-role';

const pageHeader = {
  title: 'Roles and Permissions ',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Role Management & Permission',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Role" view={<CreateRole />} />
      </PageHeader>
      <RolesGrid />
    </>
  );
}
