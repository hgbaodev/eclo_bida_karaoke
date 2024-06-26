'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Password, Textarea } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { updateProduct, getProducts } from '@/store/slices/productSlices';
import { CreateProductInput, createProductSchema } from '@/utils/validators/create-product.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { EditProductInput, editProductSchema } from '@/utils/validators/edit-product.schema';
import { number } from 'zod';


export default function EditProduct({ product, active }: { product: EditProductInput; active: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(product);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isUpdateLoading } = useSelector((state: RootState) => state.product);
  const { listType } = useSelector((state: RootState) => state.product_type);
//   const { listPositions } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    const result: any = await dispatch(updateProduct({ product: data, active }));

    if (updateProduct.fulfilled.match(result)) {
      setReset({
        product_name: '',
        selling_price: '',
        quantity: '',
        product_type:'',
      });
      setErrors({});
      closeModal();
      await dispatch(getProducts({ page, pageSize, query }));
      toast.success('Update successfully');
    } else {
      setErrors(result?.payload?.errors);
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
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Edit a Product
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
            {/* <Input
              label="Cost Price"
              type='number'
              placeholder="Enter cost price"
              {...register('cost_price')}
              className="col-span-full"
              error={errors.cost_price?.message}
            /> */}
              <Controller
              name='product_type'
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
            <Input
              label="Selling Price"
              type='number'
             
              placeholder="Enter selling price"
              {...register('selling_price',{
                valueAsNumber: true
              })}
              className="col-span-full"
              error={errors.selling_price?.message}
            />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isUpdateLoading} className="w-full @xl:w-auto">
                Edit Product
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
