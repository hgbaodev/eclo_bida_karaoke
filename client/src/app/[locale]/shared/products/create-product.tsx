'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea, FileInput } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { createProduct, getProducts } from '@/store/slices/productSlices';
import { CreateProductInput, createProductSchema } from '@/utils/validators/product/create-product.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { string } from 'zod';

export default function CreateStaff() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isCreateLoading } = useSelector((state: RootState) => state.product);
  const { listType } = useSelector((state: RootState) => state.product_type);
  // const { listPositions } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    if (data['image'] && data['image'].length > 0) {
      const imageFile = data['image'][0];
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('name', data.name);
      formData.append('product_type', data.product_type);
      try {
        const result: any = await dispatch(createProduct(formData));
        if (createProduct.fulfilled.match(result)) {
          // setReset({
          //   name: '',
          //   selling_price: '',
          //   image:'',
          //   product_type:'',

          // });
          setErrors({});
          closeModal();
          await dispatch(getProducts({ page, pageSize, query }));
          toast.success('Product created successfully');
        } else {
          setErrors(result?.payload?.errors);
        }
        console.log(data);
      } catch (error) {
        console.error('Failed to create product', error);
        toast.error('Failed to create product');
      }
    } else {
      console.error('Image is not valid', data['image']);
      toast.error('Image is not valid');
    }
  };

  return (
    <Form<CreateProductInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createProductSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Product
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Product Name"
              placeholder="Enter product name"
              className="col-span-full"
              {...register('name')}
              error={errors.name?.message}
            />
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <FileInput
                  label="Image"
                  placeholder="Select an image"
                  className="col-span-full"
                  accept="image/jpeg, image/jpg, image/png, image/webp"
                  error={errors.image?.message?.toString() || ''}
                  onChange={(e) => onChange(e.target.files)}
                />
              )}
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
                  label="Product Type"
                  className="col-span-full"
                  placeholder="Select type of product"
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
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Create Product
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}