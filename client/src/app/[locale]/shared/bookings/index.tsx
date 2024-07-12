'use client';

import { useEffect, useMemo } from 'react';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { getColumns } from './columns';
import { getDevices, setPage, setPageSize } from '@/store/slices/device_slice';

export default function DevicesTable() {
  const { data, isLoading, pageSize, page, totalRow, query } = useSelector((state: RootState) => state.device);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getDevices({ page, pageSize, query }));
    };
    fetch();
  }, [page, pageSize, query]);

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
