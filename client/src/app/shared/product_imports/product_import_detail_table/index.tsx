'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/product_imports/product_import_detail_table/columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch, useDispatch } from '@/store';
import { useSearchParams } from 'next/navigation';
import { getProductImportDetails,getProductImportsByActive, setPage, setPageSize } from '@/store/slices/product_import_detailSlice';
import { useModal } from '../../modal-views/use-modal';
import { useRouter } from 'next/router';
const FilterElement = dynamic(() => import('@/app/shared/products/product_table/filter-elements'), {
  ssr: false,
});

export default function StaffsTable() {
  const searchParams = useSearchParams(); 
  const active = searchParams.get('active');
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, totalRow, query } = useSelector((state: RootState) => state.product_import_detail);
  useEffect(() => {
    {
      const fetch = async () => {
        // @ts-ignore
       
          dispatch(getProductImportsByActive(active)); 
        
      };
      fetch();
    }
  },[active]);
  useEffect(() => {
    const fetch = async () => {
        // @ts-ignore
      await dispatch(getProductImportDetails({ page, pageSize, query, active }));
    };
    fetch();
  }, [page, pageSize, query,active]);
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
