'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/[locale]/shared/tableandrooms/service-devices-table/columns';
import { RootState } from '@/store/types';
import { dispatch, useSelector } from '@/store';
import { getServiceDevicesDetail, setPage, setPageSize } from '@/store/slices/service_device_detail_slice';
import { useModal } from '../../modal-views/use-modal';
import ModalButton from '@/app/[locale]/shared/modal-button';
import CreateServiceDeviceDetail from '@/app/[locale]/shared/tableandrooms/create-service-device-detail';
import { useTranslations } from 'next-intl';

const FilterElement = dynamic(
  () => import('@/app/[locale]/shared/tableandrooms/service-devices-table/filter-elements'),
  {
    ssr: false,
  },
);

export default function ServiceDevicesTable({ serviceActive }: { serviceActive: string }) {
  const t = useTranslations('tables_rooms');
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, totalRow, status, query } = useSelector(
    (state: RootState) => state.service_device_detail,
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(getServiceDevicesDetail({ page, pageSize, query, status, serviceActive }));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetch();
  }, [page, pageSize, query, status, serviceActive]);

  const columns = useMemo(
    () => getColumns(openModal, t),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const handleChangePageSize = (size: any) => {
    dispatch(setPageSize(size));
  };

  const handlePaginate = (page: number) => {
    dispatch(setPage(page));
  };

  const StatusLegend = () => {
    return (
      <div className="mb-4 flex items-center space-x-4">
        <p className="text-sm text-blue-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-blue-600 mr-2 rounded-full"></span>
          {t('in_use')}
        </p>
        <p className="text-sm text-green-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-green-600 mr-2 rounded-full"></span>
          {t('available')}
        </p>
        <p className="text-sm text-yellow-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-yellow-600 mr-2 rounded-full"></span>
          {t('maintenance')}
        </p>
        <p className="text-sm text-gray-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-gray-400 mr-2 rounded-full"></span>
          {t('out_of_order')}
        </p>
      </div>
    );
  };

  const { visibleColumns } = useColumn(columns);
  return (
    <div className="mt-0">
      <FilterElement />
      <div className="flex justify-between items-center mb-4">
        <StatusLegend />
        <ModalButton
          label={t('add')}
          view={<CreateServiceDeviceDetail serviceActive={serviceActive} />}
          customSize="600px"
          className="mt-0 px-4 py-2 text-sm w-auto min-w-max"
        />
      </div>
      <ControlledTable
        variant="modern"
        data={data}
        isLoading={isLoading}
        showLoadingText={false}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize: handleChangePageSize,
          total: totalRow,
          current: page,
          onChange: (page: number) => handlePaginate(page),
        }}
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
