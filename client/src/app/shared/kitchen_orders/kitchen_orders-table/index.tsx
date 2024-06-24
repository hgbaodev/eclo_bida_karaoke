'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/kitchen_orders/kitchen_orders-table/columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import usePusher from '@/hooks/use-pusher';
import { getKitchenOrders } from '@/store/slices/kitchen_orderSlice';
import { useModal } from '../../modal-views/use-modal';

export default function KitchenOrdersTable() {
  const { openModal } = useModal();
  const { data, isLoading, pageSize, page, status, query } = useSelector((state: RootState) => state.kitchen_order);

  const fetchData = useCallback(async () => {
    try {
      await dispatch(getKitchenOrders());
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  usePusher('productOrder.requested', (data: any) => {
    fetchData(); // Fetch the data when receiving new Pusher data
  });

  usePusher('productOrder.read', (data: any) => {
    console.log('usePusher', data);
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

  // Lọc dữ liệu dựa trên status là R hoặc P
  const dataR = useMemo(
    () => data.filter((kitchenOrder) => kitchenOrder.status === 'R' || kitchenOrder.status === 'P'),
    [data],
  );

  // Lọc dữ liệu dựa trên status là W
  const dataW = useMemo(() => data.filter((kitchenOrder) => kitchenOrder.status === 'W'), [data]);

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-yellow-600">
          <span className="inline-block w-3 h-3 bg-yellow-600 mr-2"></span>
          Đã tiếp nhận
        </p>
        <p className="text-sm text-blue-600">
          <span className="inline-block w-3 h-3 bg-blue-600 mr-2"></span>
          Đang chế biến
        </p>
        <p className="text-sm text-green-600">
          <span className="inline-block w-3 h-3 bg-green-600 mr-2"></span>
          Đã xong/chờ giao
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-lg font-bold mb-2">Đã nhận/Đang chế biến</h2>
          <ControlledTable
            variant="modern"
            data={dataR}
            isLoading={isLoading}
            showLoadingText={false}
            // @ts-ignore
            columns={visibleColumns}
            className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Chế biến xong/Chờ giao</h2>
          <ControlledTable
            variant="modern"
            data={dataW}
            isLoading={isLoading}
            showLoadingText={false}
            // @ts-ignore
            columns={visibleColumns}
            className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          />
        </div>
      </div>
    </>
  );
}

export const STATUSES = {
  Received: 'R',
  Waiting: 'W',
  Processing: 'P',
} as const;
