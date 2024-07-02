'use client';
import PageHeader from '@/app/shared/page-header';
import ServiceDevicesTable from '@/app/shared/tableandrooms/service-devices-table';
import { useEffect, useState } from 'react';
import { dispatch } from '@/store';
import { getServiceByActive } from '@/store/slices/serviceSlice';
import ModalButton from '@/app/shared/modal-button';
import CreateServiceDeviceDetail from '@/app/shared/tableandrooms/create-service-device-detail';

const pageHeader = {
  title: 'Service detail',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Service Detail',
    },
  ],
};

export default function BlankPage({ params }: { params: { slug: string } }) {
  const [serviceName, setServiceName] = useState('');
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await dispatch(getServiceByActive({ active: params.slug }));
        setServiceName(result.payload.data.name);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetch();
  }, [params.slug]);

  return (
    <>
      <PageHeader title={serviceName} breadcrumb={pageHeader.breadcrumb}>
        {' '}
        <ModalButton
          label="Add a new device"
          view={<CreateServiceDeviceDetail serviceActive={params.slug} />}
          customSize="600px"
          className="mt-0"
        />
      </PageHeader>
      <ServiceDevicesTable serviceActive={params.slug}></ServiceDevicesTable>
    </>
  );
}
