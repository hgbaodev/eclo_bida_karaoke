'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/[locale]/shared/dayoff/dayoff_table/column';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { getAllStaffs } from '@/store/slices/staffSlice';
import { dispatch, useDispatch } from '@/store';
import { useSearchParams } from 'next/navigation';
import { useModal } from '../../modal-views/use-modal';
import { useRouter } from 'next/router';
import { getDayoffs, setPage, setPageSize } from '@/store/slices/dayoffSlice';
const FilterElement = dynamic(() => import('@/app/[locale]/shared/products/product_table/filter-elements'), {
  ssr: false,
});

export default function DayOff_table() {
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, totalRow, query } = useSelector((state: RootState) => state.dayoff);
  useEffect(() => {
    const fetch = async () => {
      // @ts-ignore

      await dispatch(getDayoffs({ page, pageSize, query }));
    };
    fetch();
  }, [page, pageSize, query]);
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getAllStaffs(''));
    };
    fetch();
  });

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
