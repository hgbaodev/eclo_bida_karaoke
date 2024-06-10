import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react';
import { ActionIcon, Tooltip } from 'rizzui';
import PencilIcon from '../icons/pencil';

const Create = ({ onClick }) => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal({
      view: onClick,
    });
  };

  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip size="sm" content={'Create'} placement="top" color="invert">
        <ActionIcon
          onClick={handleClick}
          as="span"
          size="sm"
          variant="outline"
          className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

export default Create;
