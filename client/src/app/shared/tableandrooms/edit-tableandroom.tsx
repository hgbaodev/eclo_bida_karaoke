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
import {
  createService,
  editService,
  getAllAreas,
  getAllPrices,
  getAllServiceTypes,
  getServices,
} from '@/store/slices/serviceSlice';
import toast from 'react-hot-toast';

export default function EditTableAndRoom({ service, active }: { service: any; active: string }) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState(service);
  const [errors, setErrors] = useState<any>({});
  const { prices, areas, serviceTypes, isEditLoading, selectedArea, page, pageSize, query } = useSelector(
    (state: RootState) => state.service,
  );

  useEffect(() => {
    dispatch(getAllPrices());
    dispatch(getAllAreas());
    dispatch(getAllServiceTypes());
  }, []);

  const onSubmit: SubmitHandler<CreateServiceInput> = async (data) => {
    const result: any = await dispatch(editService({ ...data, active }));
    if (editService.fulfilled.match(result)) {
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
      toast.success('Update service successfully');
    } else if (editService.rejected.match(result)) {
      toast.error('Update service errors');
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
        console.log('errors', errors);
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Edit Service
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Name"
              placeholder="Enter name"
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
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
                      label: 'Active',
                    },
                    {
                      value: 'D',
                      label: 'Deactive',
                    },
                  ]}
                  value={value || ''}
                  onChange={onChange}
                  name={name}
                  label="Status"
                  placeholder="Select a status"
                  className="col-span-full"
                  error={errors?.status?.message}
                  getOptionValue={(option) => option.value}
                  getOptionDisplayValue={(option) => getStatusBadge(option.value)}
                  displayValue={(selected: string) => getStatusBadge(selected)}
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
                  label="Area"
                  placeholder="Select a area"
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
                  label="Service Type"
                  placeholder="Select a service type"
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
                  label="Price"
                  placeholder="Select a price"
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
                Cancel
              </Button>
              <Button type="submit" isLoading={isEditLoading} className="w-full @xl:w-auto">
                Update Service
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'D':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">InActive</Text>
        </div>
      );
    case 'A':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
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
