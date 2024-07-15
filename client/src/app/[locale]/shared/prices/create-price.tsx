'use client';

import { useState, useEffect } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { CreatePriceInput, CreatePriceSchema } from '@/utils/validators/price/create-price.schema';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { statusOptions } from './type';
import { dispatch } from '@/store';
import { createPrice, getPrices } from '@/store/slices/priceSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { StatusBadge } from './prices-table/columns';
import { useTranslations } from 'next-intl';
import { getAllServiceTypes } from '@/store/slices/service_type_slice';

export default function CreatePrice() {
  const t = useTranslations('price');
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { pageSize, page, query, status, isCreateLoading } = useSelector((state: RootState) => state.price);
  const { data: service_type } = useSelector((state: RootState) => state.service_type);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(getAllServiceTypes());
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetch();
  }, []);

  const onSubmit: SubmitHandler<CreatePriceInput> = async (data) => {
    try {
      const result: any = await dispatch(createPrice(data));
      if (createPrice.fulfilled.match(result)) {
        setReset({
          name: '',
          pricePerHour: '',
          status: '',
        });
        setErrors({});
        closeModal();
        await dispatch(getPrices({ page, pageSize, query, status }));
        toast.success(t('created_success'));
      } else {
        closeModal();
        toast.error(t('failed'));
      }
    } catch (error) {
      closeModal();
      console.error('Error submitting form:', error);
      toast.error(t('failed'));
    }
  };

  return (
    <Form<CreatePriceInput>
      resetValues={reset}
      onSubmit={onSubmit}
      // @ts-ignore
      validationSchema={CreatePriceSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('add_new_price')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label={t('name')}
              placeholder={t('enter_price_name')}
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />

            <Input
              label={t('price_per_hour')}
              type="number"
              placeholder={t('enter_price_per_hour')}
              className="col-span-full"
              {...register('pricePerHour')}
              error={errors.pricePerHour?.message}
            />

            <Controller
              name="service_type"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={service_type}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label={t('service_type')}
                  className="col-span-full"
                  placeholder={t('enter_service_type')}
                  error={errors?.service_type?.message}
                  //@ts-ignore
                  getOptionValue={(option) => option.active}
                  //@ts-ignore
                  getOptionDisplayValue={(option) => option.name}
                  displayValue={(selected: string) =>
                    //@ts-ignore
                    service_type.find((option) => option.active === selected)?.name ?? selected
                  }
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={statusOptions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label={t('status')}
                  placeholder={t('select_status')}
                  className="col-span-full"
                  error={errors?.status?.message}
                  getOptionValue={(option: { value: any }) => option.value}
                  getOptionDisplayValue={(option: { value: any }) => StatusBadge(option.value as any, t)}
                  displayValue={(selected: any) => StatusBadge(selected, t)}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
                {t('cancel')}
              </Button>
              <Button type="submit" isLoading={isCreateLoading} className="w-full @xl:w-auto">
                {t('create_price')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
