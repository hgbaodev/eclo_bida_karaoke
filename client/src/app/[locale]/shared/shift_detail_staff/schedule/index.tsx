'use client';

import { useEffect, useMemo } from 'react';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/[locale]/shared/shift_detail_staff/schedule/colunm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';
import { getAllStaffs, getOneStaff, setPage, setPageSize } from '@/store/slices/staffSlice';
import {
  getAllShiftUserDetails,
  getShiftUserDetails,
  getShiftUserDetailsByUser,
  setWorkShift,
} from '@/store/slices/shift_user_detailSlice';
import { useModal } from '../../modal-views/use-modal';
import { getShifts } from '@/store/slices/shiftSlice';
import dynamic from 'next/dynamic';
import { getAllWorkShifts, getWorkShift } from '@/store/slices/workshiftSlice';
const FilterElement = dynamic(() => import('@/app/[locale]/shared/shift_detail_staff/work_shift/filter-element'), {
  ssr: false,
});
export default function ShiftDetailStaffTable() {
  const { openModal } = useModal();
  const { active } = useSelector((state: RootState) => state.auth);
  const { oneWorkShift } = useSelector((state: RootState) => state.work_shift);
  const { oneStaff } = useSelector((state: RootState) => state.staff);
  const { listShiftUserDetailByUser, isLoading, workshift } = useSelector(
    (state: RootState) => state.shift_user_detail,
  );
  useEffect(() => {
    dispatch(getShifts());
    dispatch(getAllStaffs(''));
  }, []);
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getWorkShift(workshift));
      await dispatch(getOneStaff(active));
    };
    fetch();
  }, [workshift, active]);
  useEffect(() => {
    dispatch(getAllWorkShifts());
  }, []);
  useEffect(() => {
    const fetch = async () => {
      if (workshift && oneStaff) {
        await dispatch(getShiftUserDetailsByUser({ workshift, staff: oneStaff[0].active }));
      }
    };
    fetch();
  }, [workshift]);
  const columns = useMemo(
    () => getColumns(openModal, listShiftUserDetailByUser, oneWorkShift),
    [openModal, listShiftUserDetailByUser, oneWorkShift],
  );
  if (!workshift) {
    return (
      <div className="mt-0">
        <label style={{ fontWeight: 'bold', fontSize: '15px' }}>Work Shift:</label>
        <FilterElement />
      </div>
    );
  } else {
    return (
      <div className="mt-0">
        <label style={{ fontWeight: 'bold', fontSize: '15px' }}>Work Shift:</label>
        <FilterElement />
        <ControlledTable
          variant="modern"
          data={oneStaff}
          isLoading={isLoading}
          showLoadingText={false}
          // @ts-ignore
          columns={columns}
          className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        />
      </div>
    );
  }
}