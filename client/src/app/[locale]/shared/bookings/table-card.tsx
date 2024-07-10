'use client';

import { PiDotsThreeBold } from 'react-icons/pi';
import { Title, ActionIcon, Dropdown } from 'rizzui';
import cn from '@/utils/class-names';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import CreateUser from '@/app/[locale]/shared/roles-permissions/create-user';
import { deleteRole } from '@/store/slices/roleSlice';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';

export default function TableCard({
  id,
  name,
  status,
  className = '',
}: {
  id: number;
  name: string;
  status: string;
  className: string;
}) {
  console.log(status);
  const { openModal } = useModal();

  const handleCreateUser = () => {
    openModal({
      view: <CreateUser />,
    });
  };

  const handleRenameRole = () => {
    console.log('rename role');
  };

  const handleDeleteRole = () => {
    dispatch(deleteRole(id)).then((action: any) => {
      if (deleteRole.fulfilled.match(action)) {
        toast.success('Delete role successfully');
      } else {
        toast.error(action.payload.errors);
      }
    });
  };

  return (
    <div className={cn('rounded-lg h-[100px] border border-muted p-6', className)}>
      <header className="flex items-center justify-between gap-2 relative">
        <Dropdown className={'relative'} placement="top-end">
          <Dropdown.Trigger>
            <ActionIcon variant="text" className="absolute top-1 right-1">
              <PiDotsThreeBold className="p-4 w-6" />
            </ActionIcon>
          </Dropdown.Trigger>
          <Dropdown.Menu className="!z-0">
            <Dropdown.Item className="gap-2 text-xs sm:text-sm" onClick={handleCreateUser}>
              Add User
            </Dropdown.Item>
            <Dropdown.Item className="gap-2 text-xs sm:text-sm" onClick={handleRenameRole}>
              Rename
            </Dropdown.Item>
            <Dropdown.Item className="gap-2 text-xs sm:text-sm" onClick={handleDeleteRole}>
              Remove Role
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>
      <Title as="h5" className="font-medium">
        {name}
      </Title>
    </div>
  );
}
