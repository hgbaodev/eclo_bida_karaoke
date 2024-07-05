'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { DataColumns } from '@/app/shared/kitchen_orders/kitchen_orders-table/columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import usePusher from '@/hooks/use-pusher';
import { getKitchenOrders, appendOrders } from '@/store/slices/kitchen_orderSlice';
import toast from 'react-hot-toast';

export default function KitchenOrdersTable() {
  const { data, isLoading, status } = useSelector((state: RootState) => state.kitchen_order);

  const fetchData = useCallback(async () => {
    try {
      await dispatch(getKitchenOrders({ all: true }));
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  usePusher('kitchenOrderCreateEvent', (data: any) => {
    if (Array.isArray(data)) {
      data.forEach((order: any) => {
        dispatch(appendOrders({ data: order }));
        toast.success(`A customer just ordered a product: ${order.product_name}`);
      });
    } else {
      console.error('Expected an array of orders.');
    }
  });

  usePusher('kitchenOrderDeductEvent', (data: any) => {
    fetchData();
  });

  useEffect(() => {
    fetchData();
  }, [fetchData, status]);

  const columns = useMemo(
    () => DataColumns(data),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
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
      <div className="mb-4 flex items-center space-x-4">
        <p className="text-sm text-yellow-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-yellow-600 mr-2 rounded-full"></span>
          Đã tiếp nhận yêu cầu
        </p>
        <p className="text-sm text-blue-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-blue-600 mr-2 rounded-full"></span>
          Đang chế biến
        </p>
        <p className="text-sm text-green-600 flex items-center">
          <span className="inline-block w-3 h-3 bg-green-600 mr-2 rounded-full"></span>
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
            scrollY={400}
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
            scrollY={400}
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
