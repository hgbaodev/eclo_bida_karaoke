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
import { getAllShiftUserDetails } from '@/store/slices/shift_user_detailSlice';
import { useModal } from '../modal-views/use-modal';
import { getShifts } from '@/store/slices/shiftSlice';
import ModalButton from '../modal-button';
import CreateWorkShift from './work_shift/create-work_shift';

export default function ShiftDetailStaffTable() {
  const { openModal } = useModal();
  const { data } = useSelector((state: RootState) => state.shift);
  useEffect(() => {
    dispatch(getAllShiftUserDetails());
    dispatch(getShifts());
    dispatch(getAllStaffs(''));
  }, []);
  const { listShiftUserDetail, isLoading } = useSelector((state: RootState) => state.shift_user_detail);
  const columns = useMemo(() => getColumns(openModal, listShiftUserDetail), [openModal, listShiftUserDetail]);
  const { visibleColumns } = useColumn(columns);
  return (
    <div className="mt-0">
      <ModalButton label="Copy" view={<CreateWorkShift />} customSize="600px" className="mt-10 w-30 h-15" />
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
