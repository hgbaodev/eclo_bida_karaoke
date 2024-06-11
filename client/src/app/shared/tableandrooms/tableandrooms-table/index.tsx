'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { jobData } from '@/data/job-data';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getServices, setPage, setPageSize } from '@/store/slices/serviceSlice';
import { dispatch } from '@/store';

const filterState = {
  date: [null, null],
  status: '',
};
export default function RoomAndTablesTable({ className }: { className?: string }) {
  const { data, pageSize, isLoading, page, totalRow, query } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    dispatch(getServices({ page, pageSize, query }));
  }, [page, pageSize, query]);

  const handlePaginate = (page: number) => {
    dispatch(setPage(page));
  };

  const handleChangePageSize = (size: any) => {
    dispatch(setPageSize(size));
  };

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { sortConfig, handleSort, selectedRowKeys, handleRowSelect, handleSelectAll, handleDelete } = useTable(
    jobData,
    pageSize,
    filterState,
  );

  const columns = useMemo(
    () =>
      getColumns({
        data: jobData,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ],
  );

  const { visibleColumns } = useColumn(columns);

  return (
    <div className="mt-0">
      <FilterElement />
      <ControlledTable
        variant="modern"
        data={data}
        isLoading={isLoading}
        showLoadingText={true}
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
