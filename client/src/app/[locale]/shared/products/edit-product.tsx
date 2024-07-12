'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, FileInput } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { dispatch } from '@/store';
import { getProducts, updateProduct } from '@/store/slices/productSlices';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { useTranslations } from 'next-intl';
import { EditProductInput, editProductSchema } from '@/utils/validators/product/edit-product.schema';

export default function EditProduct({ product, active }: { product: EditProductInput; active: string }) {
  const t = useTranslations('product');
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(product);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isUpdateLoading ,type } = useSelector((state: RootState) => state.product);
  const { listType } = useSelector((state: RootState) => state.product_type);
  const onSubmit: SubmitHandler<EditProductInput> = async (data) => {
    if (data['image'] && data['image'].length > 0) {
      const imageFile = data['image'][0];
      const formData = new FormData();

      formData.append('image', imageFile);
      formData.append('name', data.name);
      formData.append('_method', 'PUT');
      formData.append('product_type', data.product_type);

      try {
        const result: any = await dispatch(updateProduct({ formData, active }));
        if (updateProduct.fulfilled.match(result)) {
          setReset({
            name: '',
            product_type: '',
          });
          setErrors({});
          closeModal();
          await dispatch(getProducts({ page, pageSize, query,type }));
          toast.success('product updated successfully');
        } else {
          setErrors(result?.payload?.errors);
        }
      } catch (error) {
        console.error('Failed to edit product', error);
        toast.error('Failed to edit product');
      }
    }
  };

  return (
    <Form<EditProductInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={editProductSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('edit_product')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <FileInput
              label={t('image')}
              placeholder="Select an image"
              {...register('image')}
              className="col-span-full"
              accept="image/jpeg, image/jpg, image/png, image/webp"
              error={errors.image?.message?.toString() || ''}
            />
            <Input
              label={t('product_name')}
              placeholder={t('input_product_name')}
              {...register('name')}
              className="col-span-[1/2]"
              error={errors.name?.message}
            />
            <Controller
              name="product_type"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={listType}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label={t('product_type')}
                  className="col-span-full"
                  placeholder={t('select_type')}
                  error={errors?.product_type?.message}
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.type_name}
                  displayValue={(selected: string) =>
                    listType.find((option) => option.active === selected)?.type_name ?? selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
              {t('cancel')}
              </Button>
              <Button type="submit" isLoading={isUpdateLoading} className="w-full @xl:w-auto">
              {t('edit_product')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
