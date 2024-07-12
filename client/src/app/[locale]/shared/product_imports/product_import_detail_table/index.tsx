'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/[locale]/shared/product_imports/product_import_detail_table/columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch, useDispatch } from '@/store';
import { useSearchParams } from 'next/navigation';
import { getProductImportDetails, setPage, setPageSize } from '@/store/slices/product_import_detailSlice';
import { getSinghle_ProductImport } from '@/store/slices/product_importSlice';
import { getSinghle_Product } from '@/store/slices/productSlices';
import { getSinghle_Supplier } from '@/store/slices/supplierSlice';
import { useModal } from '../../modal-views/use-modal';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
// const FilterElement = dynamic(() => import('@/app/[locale]/shared/products/product_table/filter-elements'), {
//   ssr: false,
// });

export default function Product_import_detail_Table() {

  const t = useTranslations('product_import_detail');
  const { listProduct } = useSelector((state: RootState) => state.product);
  const { listSupplier } = useSelector((state: RootState) => state.supplier);
  const searchParams = useSearchParams();
  const active = searchParams.get('active');
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, totalRow, query } = useSelector(
    (state: RootState) => state.product_import_detail,
  );
  useEffect(() => {
    {
      const fetch = async () => {
        // @ts-ignore

        dispatch(getSinghle_ProductImport(active));
      };
      fetch();
    }
  }, [active]);
  useEffect(() => {
    const fetch = async () => {
      // @ts-ignore
      await dispatch(getProductImportDetails({ page, pageSize, query, active }));
    };
    fetch();
  }, [page, pageSize, query, active]);
  useEffect(() => {
    dispatch(getSinghle_Product());
  }, []);
  // useEffect(() => {
  //   dispatch(getSinghle_Supplier());
  // }, []);
  useEffect(() => {
    dispatch(getSinghle_Supplier());
  }, []);
  const columns = useMemo(
    () => getColumns(openModal,t),
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
