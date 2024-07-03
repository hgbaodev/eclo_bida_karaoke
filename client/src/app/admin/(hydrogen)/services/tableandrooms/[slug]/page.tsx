'use client';
import PageHeader from '@/app/shared/page-header';
import ServiceDevicesTable from '@/app/shared/tableandrooms/service-devices-table';
import { useEffect, useState } from 'react';
import { dispatch } from '@/store';
import { getServiceByActive } from '@/store/slices/serviceSlice';

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
      </PageHeader>
      <ServiceDevicesTable serviceActive={params.slug}></ServiceDevicesTable>
    </>
  );
}
