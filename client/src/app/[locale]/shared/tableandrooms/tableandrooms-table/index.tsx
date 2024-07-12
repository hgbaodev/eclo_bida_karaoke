'use client';

import { useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from './columns';
import FilterElement from './filter-element';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getServices, setPage, setPageSize } from '@/store/slices/serviceSlice';
import { dispatch } from '@/store';
import { useModal } from '../../modal-views/use-modal';
import { useTranslations } from 'next-intl';

const filterState = {
  date: [null, null],
  status: '',
};
export default function RoomAndTablesTable({ className }: { className?: string }) {
  const t = useTranslations('tables_rooms');
  const { data, pageSize, isLoading, page, totalRow, query, selectedArea } = useSelector(
    (state: RootState) => state.service,
  );

  const { openModal } = useModal();

  console.log({ selectedArea });

  useEffect(() => {
    dispatch(getServices({ page, pageSize, query, area: selectedArea }));
  }, [page, pageSize, query, selectedArea]);

  const handlePaginate = (page: number) => {
    dispatch(setPage(page));
  };

  const handleChangePageSize = (size: any) => {
    dispatch(setPageSize(size));
  };

  const columns = useMemo(
    () => getColumns(openModal, t),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal, t],
  );

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
