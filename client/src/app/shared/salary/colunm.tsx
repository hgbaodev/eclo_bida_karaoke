'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';
export const getColumns = (openModal: (args: any) => void) => {
  const columns = [
    {
      title: <HeaderCell title="ID" />,
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (_: any, salary: Salary, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
    },
    {
      title: <HeaderCell title="Name" />,
      dataIndex: 'name',
      key: 'name',
      width: 50,
      render: (_: string, salary: Salary) => salary.staff.last_name + ' ' + salary.staff.first_name,
    },
    {
      title: <HeaderCell title="Position" />,
      dataIndex: 'position',
      key: 'position',
      width: 50,
      render: (_: string, salary: Salary) => salary.staff.position.name,
    },
    {
      title: <HeaderCell title="Base Salary" />,
      dataIndex: 'sop',
      key: 'sop',
      width: 50,
      render: (_: string, salary: Salary) => salary.staff.position.base_salary,
    },
    {
      title: <HeaderCell title="Structure of Salary" />,
      dataIndex: 'sos',
      key: 'sos',
      width: 50,
      render: (_: string, salary: Salary) => salary.staff.position.salary_structure,
    },
    {
      title: <HeaderCell title="Working Days" />,
      dataIndex: 'wd',
      key: 'wd',
      width: 50,
      render: (_: string, salary: Salary) => salary.working_days,
    },
    {
      title: <HeaderCell title="Off Days" />,
      dataIndex: 'od',
      key: 'od',
      width: 50,
      render: (_: string, salary: Salary) => salary.off_days,
    },
    {
      title: <HeaderCell title="Working Hours" />,
      dataIndex: 'wh',
      key: 'wh',
      width: 50,
      render: (_: string, salary: Salary) => salary.working_hours,
    },
    {
      title: <HeaderCell title="Total" />,
      dataIndex: 'total',
      key: 'total',
      width: 50,
      render: (_: string, salary: Salary) => salary.total,
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
  working_hours: number;
  total: number;
  active: string;
}
