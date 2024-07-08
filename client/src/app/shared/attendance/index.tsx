'use client';

import { useEffect, useMemo } from 'react';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/attendance/colunm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { getAllStaffs } from '@/store/slices/staffSlice';

import { useModal } from '../modal-views/use-modal';
import dynamic from 'next/dynamic';
import { getAttendances } from '@/store/slices/attendanceSlice';
import { setQuery } from '@/store/slices/product_importSlice';
const FilterElement = dynamic(() => import('@/app/shared/attendance/filter-element'), {
  ssr: false,
});
export default function ShiftDetailStaffTable() {
  const { openModal } = useModal();
  const { dataAttendance, isLoading, month, year } = useSelector((state: RootState) => state.attendance);
  const { data, query } = useSelector((state: RootState) => state.staff);
  useEffect(() => {
    dispatch(getAllStaffs(query));
  }, [query]);
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getAttendances({ month, year }));
    };
    fetch();
  }, [setQuery, month, year]);
  const columns = useMemo(
    () => getColumns(openModal, dataAttendance, month, year),
    [openModal, dataAttendance, month, year],
  );
  return (
    <div className="mt-0">
      <label style={{ fontWeight: 'bold', fontSize: '15px' }}>Work Shift:</label>
      <FilterElement />
      <ControlledTable
        variant="modern"
        data={data}
        isLoading={isLoading}
        showLoadingText={false}
        // @ts-ignore
        columns={columns}
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
