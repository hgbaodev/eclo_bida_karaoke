'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/[locale]/shared/products/product_table/columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { getProducts, setPage, setPageSize } from '@/store/slices/productSlices';
import { getProductType } from '@/store/slices/product_typeSlices';
import { useModal } from '../../modal-views/use-modal';
import { useTranslations } from 'next-intl';
const FilterElement = dynamic(() => import('@/app/[locale]/shared/products/product_table/filter-elements'), {
  ssr: false,
});

export default function ProductsTable() {
  const t = useTranslations('product');
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, totalRow, query ,type} = useSelector((state: RootState) => state.product);
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getProducts({ page, pageSize, query ,type}));
    };
    fetch();
  }, [page, pageSize, query,type]);
  useEffect(() => {
    dispatch(getProductType());
  }, []);
  const columns = useMemo(
    () => getColumns(openModal, t),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
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
