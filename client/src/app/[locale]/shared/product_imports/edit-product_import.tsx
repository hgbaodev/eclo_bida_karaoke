'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Password, Textarea } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { updateProduct, getProductImports } from '@/store/slices/product_importSlice';
import {
  CreateProduc_ImporttInput,
  createProduct_ImportSchema,
} from '@/utils/validators/product/create-product_import.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import {
  EditProduc_ImporttInput,
  editProduct_ImportSchema,
} from '@/utils/validators/product/edit-product_import.schema';
import { number } from 'zod';
import { getStatusBadge } from './product_import_table/columns';
import { statusOptions } from './type';

export default function EditProduct({
  product_import,
  active,
}: {
  product_import: EditProduc_ImporttInput;
  active: string;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState<any>(product_import);
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, isUpdateLoading } = useSelector((state: RootState) => state.product_import);
  //   const { listPositions } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<EditProduc_ImporttInput> = async (data) => {
    const result: any = await dispatch(updateProduct({ product_import: data, active }));

    if (updateProduct.fulfilled.match(result)) {
      setReset({
        create_time: '',
        receive_time: '',
        status: '',
      });
      setErrors({});
      closeModal();
      await dispatch(getProductImports({ page, pageSize, query }));
      toast.success('Import updated successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };
  return (
    <Form<EditProduc_ImporttInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={editProduct_ImportSchema}
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
              label="Create time"
              type="date"
              className="col-span-full"
              {...register('create_time')}
              error={errors.create_time?.message}
            />
            <Input
              label="Receive Time"
              type="date"
              placeholder="Enter cost price"
              {...register('receive_time')}
              className="col-span-full"
              error={errors.receive_time?.message}
            />

            {/* <Input
                label="Total cost"
                type='number'
                placeholder="Enter total cost"
                {...register('total_cost')}
                className="col-span-full"
                error={errors.total_cost?.message}
                readOnly
              /> */}
            <Controller
              name="status"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={statusOptions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Status"
                  placeholder="Select a status"
                  className="col-span-[1/2]"
                  error={errors?.status?.message}
                  getOptionValue={(option: { value: any }) => option.value}
                  getOptionDisplayValue={(option: { value: any }) => getStatusBadge(option.value as any)}
                  displayValue={(selected: any) => getStatusBadge(selected)}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
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
