'use client';

import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Textarea, Select, Badge, Text } from 'rizzui';
import { CreateServiceInput, createServiceSchema } from '@/utils/validators/create-service.schema';
import { useModal } from '../modal-views/use-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { createService, getAllAreas, getAllPrices, getAllServiceTypes, getServices } from '@/store/slices/serviceSlice';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

export default function CreateTableAndRoom() {
  const t = useTranslations('tables_rooms');
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [errors, setErrors] = useState<any>({});
  const { prices, areas, serviceTypes, isCreateLoading, selectedArea, page, pageSize, query } = useSelector(
    (state: RootState) => state.service,
  );

  useEffect(() => {
    dispatch(getAllPrices());
    dispatch(getAllAreas());
    dispatch(getAllServiceTypes());
  }, []);

  const onSubmit: SubmitHandler<CreateServiceInput> = async (data) => {
    const result: any = await dispatch(createService(data));
    if (createService.fulfilled.match(result)) {
      setReset({
        name: '',
        description: '',
        status: '',
        area_active: '',
        price_active: '',
        service_type_active: '',
      });
      closeModal();
      dispatch(getServices({ page, pageSize, query, area: selectedArea }));
      toast.success(t('successful'));
    } else if (createService.rejected.match(result)) {
      toast.error(t('failed'));
    }
  };

  return (
    <Form<CreateServiceInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createServiceSchema}
      serverError={errors}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900 h-[700px] overflow-auto"
    >
      {({ setError, register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t('add_new_service')}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label={t('name')}
              placeholder={t('enter_name')}
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />
            <Textarea
              label={t('description')}
              placeholder={t('enter_description')}
              {...register('description')}
              className="col-span-full"
              error={errors.description?.message}
            />
            <Controller
              name="status"
              control={control}
              defaultValue=""
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={[
                    {
                      value: 'A',
                      label: t('active'),
                    },
                    {
                      value: 'D',
                      label: t('deactive'),
                    },
                  ]}
                  value={value || ''}
                  onChange={onChange}
                  name={name}
                  label={t('status')}
                  placeholder="Select a status"
                  className="col-span-full"
                  error={errors?.status?.message}
                  getOptionValue={(option) => option.value}
                  getOptionDisplayValue={(option) => getStatusBadge(option.value, t)}
                  displayValue={(selected: string) => getStatusBadge(selected, t)}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <Controller
              name="area_active"
              defaultValue=""
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={areas.map((area) => ({
                    value: area.active,
                    label: area.name,
                  }))}
                  value={value || ''}
                  onChange={onChange}
                  name={name}
                  label={t('area')}
                  placeholder={t('select_area')}
                  className="col-span-full"
                  getOptionValue={(option) => option.value}
                  getOptionDisplayValue={(option) => option.label}
                  displayValue={(selected: string) => areas.find((area) => area.active === selected)?.name ?? selected}
                  error={errors?.area_active?.message}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <Controller
              name="service_type_active"
              control={control}
              defaultValue=""
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={serviceTypes.map((serviceType) => ({
                    value: serviceType.active,
                    label: serviceType.name,
                  }))}
                  value={value || ''}
                  onChange={onChange}
                  name={name}
                  label={t('service_type')}
                  placeholder={t('select_service_type')}
                  className="col-span-full"
                  getOptionValue={(option) => option.value}
                  getOptionDisplayValue={(option) => option.label}
                  displayValue={(selected: string) =>
                    serviceTypes.find((st) => st.active === selected)?.name ?? selected
                  }
                  error={errors?.service_type_active?.message}
                  dropdownClassName="!z-[1]"
                  inPortal={false}
                />
              )}
            />
            <Controller
              name="price_active"
              control={control}
              defaultValue=""
              render={({ field: { name, onChange, value } }) => (
                <Select
                  options={prices.map((price) => ({
                    value: price.active,
                    label: price.name + ' / ' + price.pricePerHour + '$',
                  }))}
                  value={value || ''}
                  onChange={onChange}
                  name={name}
                  label={t('price')}
                  placeholder={t('select_price')}
                  className="col-span-full"
                  getOptionValue={(option) => option.value}
                  getOptionDisplayValue={(option) => option.label}
                  displayValue={(selected: string) =>
                    prices.find((price) => price.active === selected)?.name ?? selected
                  }
                  error={errors?.price_active?.message}
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
                {t('create_service')}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}

function getStatusBadge(status: string, t: any) {
  switch (status) {
    case 'D':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">{t('deactive')} </Text>
        </div>
      );
    case 'A':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{t('active')}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}
