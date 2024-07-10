'use client';

import { useMemo, useEffect } from 'react';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from './columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { setPage, setPageSize } from '@/store/slices/invoiceSlice';
import { dispatch } from '@/store';
import { useModal } from '@/app/[locale]/shared/modal-views/use-modal';
import { getInvoices } from '@/store/slices/invoiceSlice';

export default function InvoicesTable() {
  const { data, pageSize, isLoading, page, totalRow, query } = useSelector((state: RootState) => state.invoice);

  const { openModal } = useModal();

  useEffect(() => {
    dispatch(getInvoices({ page, pageSize, query }));
  }, [page, pageSize, query]);

  const handlePaginate = (page: number) => {
    dispatch(setPage(page));
  };

  const handleChangePageSize = (size: any) => {
    dispatch(setPageSize(size));
  };

  const columns = useMemo(
    () => getColumns(openModal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal],
  );

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
