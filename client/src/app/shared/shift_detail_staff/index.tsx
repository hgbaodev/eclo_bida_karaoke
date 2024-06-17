'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/shift_detail_staff/colunm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { getAllStaffs, setPage, setPageSize } from '@/store/slices/staffSlice';
import { useModal } from '../modal-views/use-modal';
import { getShifts } from '@/store/slices/shiftSlice';

export default function ShiftDetailStaffTable() {
  const { openModal } = useModal();
  const { data, isLoading } = useSelector((state: RootState) => state.shift);
  useEffect(() => {
    dispatch(getShifts());
  }, []);
  useEffect(() => {
    dispatch(getAllStaffs(''));
  }, []);

  const columns = useMemo(
    () => getColumns(openModal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
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
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
