'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getColumns } from '@/app/shared/shift/shifts-table/colunms';
import { dispatch } from '@/store';
import { useModal } from '../../modal-views/use-modal';
import { getAllShifts, setPage, setPageSize } from '@/store/slices/shiftSlice';
const FilterElement = dynamic(() => import('@/app/shared/shift/shifts-table/filter-element'), {
  ssr: false,
});

export default function ShiftsTable() {
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, totalRow, query, status } = useSelector((state: RootState) => state.shift);
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getAllShifts({ page, pageSize, query, status }));
    };
    fetch();
  }, [page, pageSize, query, status]);

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

  const { visibleColumns } = useColumn(columns);
  return (
    <div className="mt-0">
      <FilterElement />
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
