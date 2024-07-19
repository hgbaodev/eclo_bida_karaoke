'use client';
import { HeaderCell } from '@/components/ui/table';
export const getColumns = (openModal: (args: any) => void, t: any) => {
  const columns = [
    {
      title: <HeaderCell title={t('table_id')} />,
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (_: any, salary: Salary, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
    },
    {
      title: <HeaderCell title={t('table_name')} />,
      dataIndex: 'name',
      key: 'name',
      width: 50,
      render: (_: string, salary: Salary) => salary.staff.last_name + ' ' + salary.staff.first_name,
    },
    {
      title: <HeaderCell title={t('table_position')} />,
      dataIndex: 'position',
      key: 'position',
      width: 50,
      render: (_: string, salary: Salary) => {
        return salary.staff.position ? salary.staff.position.name : '';
      },
    },
    {
      title: <HeaderCell title={t('table_basesalary')} />,
      dataIndex: 'sop',
      key: 'sop',
      width: 50,
      render: (_: string, salary: Salary) => {
        return salary.staff.position
          ? salary.staff.position.base_salary.toLocaleString('de-DE', { minimumFractionDigits: 2 })
          : '';
      },
    },
    {
      title: <HeaderCell title={t('table_structure')} />,
      dataIndex: 'sos',
      key: 'sos',
      width: 50,
      render: (_: string, salary: Salary) => {
        return salary.staff.position ? salary.staff.position.salary_structure : '';
      },
    },
    {
      title: <HeaderCell title={t('table_workingdays')} />,
      dataIndex: 'wd',
      key: 'wd',
      width: 50,
      render: (_: string, salary: Salary) => salary.working_days,
    },
    {
      title: <HeaderCell title={t('table_offdays')} />,
      dataIndex: 'od',
      key: 'od',
      width: 50,
      render: (_: string, salary: Salary) => {
        return (
          <>
            <div>
              {t('approveds')}
              {salary.off_days}
            </div>
            <div>
              {t('unapproveds')}
              {salary.off_days_unapproved}
            </div>
          </>
        );
      },
    },
    {
      title: <HeaderCell title={t('table_workinghours')} />,
      dataIndex: 'wh',
      key: 'wh',
      width: 50,
      render: (_: string, salary: Salary) => salary.working_hours.toLocaleString('de-DE', { minimumFractionDigits: 2 }),
    },
    {
      title: <HeaderCell title={t('table_total')} />,
      dataIndex: 'total',
      key: 'total',
      width: 50,
      render: (_: string, salary: Salary) => salary.total.toLocaleString('de-DE', { minimumFractionDigits: 2 }),
    },
  ];

  return columns;
};

export interface Salary {
  month: number;
  year: number;
  staff: {
    first_name: string;
    last_name: string;
    active: string;
    position: {
      name: string;
      base_salary: number;
      salary_structure: string;
    };
  };
  working_days: number;
  off_days: number;
  off_days_unapproved: number;
  working_hours: number;
  total: number;
  active: string;
}
