'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/tableandrooms/service-devices-table/columns';
import { RootState } from '@/store/types';
import { dispatch, useSelector } from '@/store';
import { getServiceDevicesDetail, setPage, setPageSize } from '@/store/slices/service_device_detailSlice';
import { useModal } from '../../modal-views/use-modal';
const FilterElement = dynamic(() => import('@/app/shared/tableandrooms/service-devices-table/filter-elements'), {
  ssr: false,
});

export default function ServiceDevicesTable({ serviceActive }: { serviceActive: string }) {
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
    () => getColumns(openModal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
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
          Đang sử dụng
        </p>
        <p className="text-sm text-green-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-green-600 mr-2 rounded-full"></span>
          Khả dụng
        </p>
        <p className="text-sm text-yellow-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-yellow-600 mr-2 rounded-full"></span>
          Bảo trì
        </p>
        <p className="text-sm text-gray-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-gray-400 mr-2 rounded-full"></span>
          Không hoạt động
        </p>
      </div>
    );
  };

  const { visibleColumns } = useColumn(columns);
  return (
    <div className="mt-0">
      <FilterElement />
      <StatusLegend />
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
