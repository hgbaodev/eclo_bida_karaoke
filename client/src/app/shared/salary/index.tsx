'use client';

import { useEffect, useMemo } from 'react';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/salary/colunm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';

import { useModal } from '../modal-views/use-modal';
import dynamic from 'next/dynamic';
import { getSalaries } from '@/store/slices/salarySlice';
const FilterElement = dynamic(() => import('@/app/shared/salary/filter-element'), {
  ssr: false,
});
export default function SalaryTable() {
  const { openModal } = useModal();
  const { dataSalary, isLoading, query, month, year } = useSelector((state: RootState) => state.salary);
  useEffect(() => {
    dispatch(getSalaries({ month, year, query }));
  }, [query, month, year]);
  const columns = useMemo(() => getColumns(openModal), [openModal]);
  return (
    <div className="mt-0">
      <FilterElement />
      <ControlledTable
        variant="modern"
        data={dataSalary}
        isLoading={isLoading}
        showLoadingText={false}
        // @ts-ignore
        columns={columns}
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
