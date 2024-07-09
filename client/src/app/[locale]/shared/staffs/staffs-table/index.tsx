'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/[locale]/shared/staffs/staffs-table/columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { getStaffs, setPage, setPageSize } from '@/store/slices/staffSlice';
import { useModal } from '../../modal-views/use-modal';
const FilterElement = dynamic(() => import('@/app/[locale]/shared/staffs/staffs-table/filter-element'), {
  ssr: false,
});

export default function StaffsTable() {
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, totalRow, query, position, status } = useSelector(
    (state: RootState) => state.staff,
  );

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getStaffs({ page, pageSize, query, position, status }));
    };
    fetch();
  }, [page, pageSize, query, position, status]);

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
