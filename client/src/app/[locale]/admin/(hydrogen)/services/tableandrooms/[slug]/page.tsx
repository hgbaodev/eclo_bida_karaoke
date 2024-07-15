'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import ServiceDevicesTable from '@/app/[locale]/shared/tableandrooms/service-devices-table';
import { useEffect, useState } from 'react';
import { dispatch } from '@/store';
import { getServiceByActive } from '@/store/slices/serviceSlice';
import { useTranslations } from 'next-intl';
import useCheckPermissions from '@/hooks/use-check-permission';

export default function BlankPage({ params }: { params: { slug: string } }) {
  const t = useTranslations('tables_rooms');
  const check = useCheckPermissions('table&room.View');
  if (!check) {
    window.location.href = '/error/403';
  }
  const pageHeader = {
    breadcrumb: [
      {
        href: '/admin',
        name: t('breadcrumb_analytics'),
      },
      {
        name: t('service_detailed_title'),
      },
    ],
  };
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
