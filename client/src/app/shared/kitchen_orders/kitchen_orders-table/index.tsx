'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/kitchen_orders/kitchen_orders-table/columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import usePusher from '@/hooks/use-pusher';
import { getRequestedProducts } from '@/store/slices/requested_productsSlice';
import { useModal } from '../../modal-views/use-modal';

export default function KitchenOrdersTable() {
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, totalRow, status, query } = useSelector(
    (state: RootState) => state.requested_products,
  );

  const fetchData = useCallback(async () => {
    try {
      await dispatch(getRequestedProducts());
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  usePusher('productOrder.requested', (data: any) => {
    console.log('usePusher', data);
    fetchData(); // Fetch the data when receiving new Pusher data
  });

  useEffect(() => {
    fetchData();
  }, [fetchData, page, pageSize, query, status]);

  const columns = useMemo(
    () => getColumns(openModal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openModal],
  );

  const { visibleColumns } = useColumn(columns);
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <ControlledTable
        variant="modern"
        data={data}
        isLoading={isLoading}
        showLoadingText={false}
        // @ts-ignore
        columns={visibleColumns}
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
      <ControlledTable
        variant="modern"
        data={data}
        isLoading={isLoading}
        showLoadingText={false}
        // @ts-ignore
        columns={visibleColumns}
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
