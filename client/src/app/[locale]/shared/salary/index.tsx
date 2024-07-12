'use client';

import { useEffect, useMemo } from 'react';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/[locale]/shared/salary/colunm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { dispatch } from '@/store';

import { useModal } from '../modal-views/use-modal';
import dynamic from 'next/dynamic';
import { getSalaries } from '@/store/slices/salarySlice';
import { useTranslations } from 'next-intl';
const FilterElement = dynamic(() => import('@/app/[locale]/shared/salary/filter-element'), {
  ssr: false,
});
export default function SalaryTable() {
  const t = useTranslations('salary');
  const { openModal } = useModal();
  const { dataSalary, isLoading, query, month, year } = useSelector((state: RootState) => state.salary);
  useEffect(() => {
    dispatch(getSalaries({ month, year, query }));
  }, [query, month, year]);
  const columns = useMemo(() => getColumns(openModal, t), [openModal, t]);
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
