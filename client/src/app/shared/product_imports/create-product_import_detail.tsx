'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
// import { createProduct, getProductImports } from '@/store/slices/product_importSlice';
import { createProductImportDetail, getProductImportDetails } from '@/store/slices/product_import_detailSlice';
import {
  CreateProduct_Import_DetailtInput,
  createProduct_Import_DetailSchema,
} from '@/utils/validators/product/create-product_import_detail.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { statusOptions } from './type';
import { useSearchParams } from 'next/navigation';
import { values } from 'lodash';
import { updateProduct } from '@/store/slices/productSlices';

export default function CreateProductImportDetail() {
  const { closeModal } = useModal();
  const searchParams = useSearchParams();
  const active = searchParams.get('active');
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isCreateLoading } = useSelector((state: RootState) => state.product_import_detail);
  const { listProduct } = useSelector((state: RootState) => state.product);
  const { listSupplier } = useSelector((state: RootState) => state.supplier);
  const { data1 } = useSelector((state: RootState) => state.product_import);
  const onSubmit: SubmitHandler<CreateProduct_Import_DetailtInput> = async (data) => {
    const result: any = await dispatch(createProductImportDetail(data));
    console.log(result);
    if (createProductImportDetail.fulfilled.match(result)) {
      setReset({
        product: '',
        quantity: '',
        supplier: '',
        cost_price: '',
        selling_price: '',
        import: '',
      });
      setErrors({});
      closeModal();
      //@ts-expect-errorts-inogre
      await dispatch(getProductImportDetails({ page, pageSize, query, active }));
      // await dispatch(updateProduct({}));
      toast.success('Import product successfully');
    } else {
      setErrors(result?.payload?.errors);
      closeModal();
      toast.error(result.payload.errors);
    }
    console.log(data);
  };
  return (
    <Form<CreateProduct_Import_DetailtInput>
      resetValues={{ import: data1.active, ...reset }}
      onSubmit={onSubmit}
      validationSchema={createProduct_Import_DetailSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Import Product
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Import day"
              className="col-span-full"
              error={errors.import?.message}
              value={data1.create_time}
              readOnly
            />
            <Controller
              name="product"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={listProduct}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Product"
                  className="col-span-full"
                  placeholder="Select a product"
                  error={errors?.product?.message}
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.name}
                  displayValue={(selected: string) =>
                    listProduct.find((option) => option.active === selected)?.name ?? selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <Controller
              name="supplier"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={listSupplier}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Supplier"
                  className="col-span-full"
                  placeholder="Select a supplier"
                  error={errors?.supplier?.message}
                  getOptionValue={(option) => option.active}
                  getOptionDisplayValue={(option) => option.name}
                  displayValue={(selected: string) =>
                    listSupplier.find((option) => option.active === selected)?.name ?? selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />

            <Input
              type="number"
              label="Cost price"
              placeholder="Enter cost price of product "
              {...register('cost_price')}
              className="col-span-full"
              error={errors.cost_price?.message}
            />
            <Input
              type="number"
              label="Selling price"
              placeholder="Enter Selling price of product "
              {...register('selling_price')}
              className="col-span-full"
              error={errors.selling_price?.message}
            />
            <Input
              type="number"
              label="Quantity"
              placeholder="Enter quantity of product"
              {...register('quantity')}
              className="col-span-full"
              error={errors.quantity?.message}
            />

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                Cancel
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                Add product
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
