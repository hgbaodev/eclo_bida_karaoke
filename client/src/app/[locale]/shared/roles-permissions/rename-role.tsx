'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { PiChecksBold, PiFilesBold, PiXBold } from 'react-icons/pi';
import { RgbaColorPicker } from 'react-colorful';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, Tooltip, ActionIcon, Title } from 'rizzui';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { RenameRoleInput, renameRoleSchema } from '@/utils/validators/role/rename-role.schema';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { renameRole, getRoles } from '@/store/slices/roleSlice';
import toast from 'react-hot-toast';

export default function RenameRole({ id, role }: { id: number; role: any }) {
  const t = useTranslations('roles_permissions');
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(role);
  const { fetchDataLoading } = useSelector((state: RootState) => state.role);
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();
  const [errors, setErrors] = useState({} as any);

  // Phân tích chuỗi màu RGBA
  //@ts-ignore
  const parseRgba = useCallback((rgbaString) => {
    const match = rgbaString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/);
    return match
      ? { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]), a: parseFloat(match[4]) }
      : { r: 0, g: 0, b: 0, a: 1 };
  }, []);

  const initialValues = {
    name: role.name,
    color: parseRgba(role.color),
  };

  const onSubmit: SubmitHandler<RenameRoleInput> = async (data) => {
    const rgbaString = `rgba(${data?.color?.r}, ${data?.color?.g}, ${data?.color?.b}, ${data?.color?.a})`;
    const values = {
      name: data.name,
      color: rgbaString,
    };
    await dispatch(renameRole({ id: id, role: values })).then((action: any) => {
      if (renameRole.fulfilled.match(action)) {
        setReset({
          name: '',
          color: '',
        });
        setErrors({});
        dispatch(getRoles());
        toast.success(t('role.update_success'));
        closeModal();
      } else {
        setErrors(action.payload.errors);
      }
    });
  };

  const handleCopyToClipboard = (rgba: string) => {
    copyToClipboard(rgba);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Form<RenameRoleInput>
      onSubmit={onSubmit}
      validationSchema={renameRoleSchema}
      serverError={errors}
      className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
      useFormProps={{
        defaultValues: initialValues,
      }}
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        const getColor = watch('color');
        const colorCode = `rgba(${getColor?.r ?? 1}, ${getColor?.g ?? 1}, ${getColor?.b ?? 1}, ${getColor?.a ?? 1})`;
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('rename_role')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label={t('role_name')}
              placeholder={t('role_name')}
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label={t('role_color')}
              placeholder={t('role_color')}
              readOnly
              inputClassName="hover:border-muted"
              suffix={
                <Tooltip
                  size="sm"
                  content={isCopied ? t('copied_to_clipboard') : t('click_to_copy')}
                  placement="top"
                  className="z-[1000]"
                >
                  <ActionIcon
                    variant="text"
                    title={t('click_to_copy')}
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
                {t('role.cancel')}
              </Button>
              <Button type="submit" isLoading={fetchDataLoading} className="w-full @xl:w-auto">
                {t('role.save')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
