'use client';

import { useSelector } from 'react-redux';
import { useModal } from '../../modal-views/use-modal';
import { RootState } from '@/store/types';
import { useEffect, useMemo } from 'react';
import ControlledTable from '@/components/controlled-table';
import { dispatch } from '@/store';
import { getPrices, setPage, setPageSize } from '@/store/slices/priceSlice';
import { getColumns } from './columns';
import { useColumn } from '@/hooks/use-column';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const FilterElement = dynamic(() => import('@/app/[locale]/shared/prices/prices-table/filter-element'), {
  ssr: false,
});

export default function PricesTable() {
  const t = useTranslations('price');
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, totalRow, status, query } = useSelector((state: RootState) => state.price);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(getPrices({ page, pageSize, query, status }));
      } catch (error) {
        console.log('Error: ' + error);
      }
    };

    fetch();
  }, [page, pageSize, query, status]);

  const columns = useMemo(() => getColumns(openModal, t), [t]);

  const handleChangePageSize = (size: any) => {
    dispatch(setPageSize(size));
  };

  const handlePaginate = (page: number) => {
    dispatch(setPage(page));
  };

  const { visibleColumns } = useColumn(columns);

  return (
    <>
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
        ></ControlledTable>
      </div>
    </>
  );
}
