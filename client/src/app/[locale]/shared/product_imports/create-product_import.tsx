'use client';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { createProduct, getProductImports } from '@/store/slices/product_importSlice';
import {
  CreateProduc_ImporttInput,
  createProduct_ImportSchema,
} from '@/utils/validators/product/create-product_import.schema';
import { dispatch } from '@/store';
import toast from 'react-hot-toast';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { useTranslations } from 'next-intl';

export default function CreateStaff() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const [additionalInputs, setAdditionalInputs] = useState<string[][]>([]); 
  const { pageSize, page, query, isCreateLoading } = useSelector((state: RootState) => state.product_import);
  const { listProduct } = useSelector((state: RootState) => state.product);
  const t = useTranslations('product_import');
  // const { listPositions } = useSelector((state: RootState) => state.position);
  const onSubmit: SubmitHandler<CreateProduc_ImporttInput> = async (data) => {
    const result: any = await dispatch(createProduct(data));

    if (createProduct.fulfilled.match(result)) {
      setReset({
        create_time: '',
        receive_time: '',
        status: '',
        total_cost: '',
        products: data.products.map(product => ({
          product: product.product,
          quantity: product.quantity,
          cost_price: product.cost_price,
      })),
      });
      setErrors({});
      closeModal();
      await dispatch(getProductImports({ page, pageSize, query }));
      toast.success('Import created successfully');
    } else {
      setErrors(result?.payload?.errors);
    }
  };

  const addAdditionalInputs = () => {
    setAdditionalInputs((prevInputs) => [
      ...prevInputs,
      [
        `combobox_${prevInputs.length * 3 + 1}`,
        `additional_input_${prevInputs.length * 3 + 2}`,
        `additional_input_${prevInputs.length * 3 + 3}`,
      ],
    ]);
  };

  const comboboxOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <Form<CreateProduc_ImporttInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createProduct_ImportSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        console.log(errors)
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('add_import')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              type="date"
              label={t('create_time')}
              className="col-span-full"
              {...register('create_time')}
              error={errors.create_time?.message}
            />
            <Input
              type="date"
              label={t('receive_time')}
              {...register('receive_time')}
              className="col-span-full"
              error={errors.receive_time?.message}
            />
            <div
              onClick={addAdditionalInputs}
              className="col-span-full p-1 text-sm bg-transparent cursor-pointer"
              style={{ border: 'none', display: 'inline-block', color: 'blue', textDecoration: 'underline' }}
            >
              {t('add_more_inputs')}
            </div>

            {additionalInputs.map((inputGroup, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 col-span-full">
                 <Controller
              name={`products.${index}.product`}
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={listProduct}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label={t('product_name')}
                  placeholder={t('select_product')}
                  error={errors.products?.[index]?.product?.message}
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
                <Input
                  key={inputGroup[1]}
                  label={`Quantity`}
                  {...register(`products.${index}.quantity`)}
                  error={errors.products?.[index]?.quantity?.message}
                />
                <Input
                  key={inputGroup[2]}
                  label={`Import price`}
                  {...register(`products.${index}.cost_price`)}
                  error={errors.products?.[index]?.cost_price?.message}
                />
              </div>
            ))}

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                {t('cancel')}
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                {t('btn_add')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}