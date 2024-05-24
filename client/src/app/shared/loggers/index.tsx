'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { channel } from '@/helpers/pusherConfig';
import { getLoggers, setPage, setPageSize } from '@/store/slices/loggerSlice';
import { getColumns } from './columns';
import usePusher from '@/hooks/use-pusher';
const FilterElement = dynamic(() => import('@/app/shared/users/users-table/filter-element'), {
  ssr: false,
});

export default function LoggersTable() {
  const { data, isLoading, pageSize, page, totalRow, query } = useSelector((state: RootState) => state.logger);

  usePusher('loggerEvent', (data: any) => {
    console.log('usePusher', data);
  });

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getLoggers({ page, pageSize, query }));
    };
    fetch();
  }, [page, pageSize, query]);
  console.log('data', data);

  const columns = useMemo(
    () => getColumns(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleChangePageSize = (size: any) => {
    dispatch(setPageSize(size));
  };

  const handlePaginate = (page: number) => {
    dispatch(setPage(page));
  };

  const { visibleColumns } = useColumn(columns);
  return (
    <div className="mt-0">
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
