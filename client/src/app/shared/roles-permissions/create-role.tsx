'use client';

import { useState } from 'react';
import { PiChecksBold, PiFilesBold, PiXBold } from 'react-icons/pi';
import { RgbaColorPicker } from 'react-colorful';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, Tooltip, ActionIcon, Title } from 'rizzui';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { CreateRoleInput, createRoleSchema } from '@/utils/validators/create-role.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { createRole } from '@/store/slices/roleSlice';
import toast from 'react-hot-toast';

export default function CreateRole() {
  const { closeModal } = useModal();
  const { createLoading } = useSelector((state: RootState) => state.role);
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();

  const onSubmit: SubmitHandler<CreateRoleInput> = (data) => {
    const rgbaString = `rgba(${data?.color?.r}, ${data?.color?.g}, ${data?.color?.b}, ${data?.color?.a})`;
    const values = {
      name: data.name,
      color: rgbaString,
    };
    dispatch(createRole(values)).then((action: any) => {
      if (createRole.fulfilled.match(action)) {
        toast.success('Role created successfully');
        closeModal();
      } else {
        console.log('action.payload.errors', action.payload.errors);
      }
    });
  };

  const handleCopyToClipboard = (rgba: string) => {
    copyToClipboard(rgba);
    setIsCopied(() => true);
    setTimeout(() => {
      setIsCopied(() => false);
    }, 3000);
  };

  return (
    <Form<CreateRoleInput>
      // resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createRoleSchema}
      className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        const getColor = watch('color');
        const colorCode = `rgba(${getColor?.r ?? 1}, ${getColor?.g ?? 1}, ${getColor?.b ?? 1}, ${getColor?.a ?? 1})`;
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Role
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input label="Role Name" placeholder="Role name" {...register('name')} error={errors.name?.message} />
            <Input
              label="Role Color"
              placeholder="Role Color"
              readOnly
              inputClassName="hover:border-muted"
              suffix={
                <Tooltip
                  size="sm"
                  content={isCopied ? 'Copied to Clipboard' : 'Click to Copy'}
                  placement="top"
                  className="z-[1000]"
                >
                  <ActionIcon
                    variant="text"
                    title="Click to Copy"
                    onClick={() => handleCopyToClipboard(colorCode)}
                    className="-mr-3"
                  >
                    {isCopied ? <PiChecksBold className="h-[18px] w-[18px]" /> : <PiFilesBold className="h-4 w-4" />}
                  </ActionIcon>
                </Tooltip>
              }
              value={colorCode}
            />
            <Controller
              control={control}
              name="color"
              render={({ field: { onChange, value } }) => <RgbaColorPicker color={value} onChange={onChange} />}
            />

            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={createLoading} className="w-full @xl:w-auto">
                Create Role
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
