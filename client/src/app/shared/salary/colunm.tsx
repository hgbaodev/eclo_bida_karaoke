'use client';
import React, { useState, useEffect } from 'react';
import { HeaderCell } from '@/components/ui/table';
// Ví dụ lấy ngày đầu tháng và ngày cuối tháng cho tháng 6 năm 2024
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
      dataIndex: 'sop',
      key: 'sop',
      width: 50,
      render: (_: string, salary: Salary) => salary.staff.position.salary_structure,
    },
    {
      title: <HeaderCell title="Total" />,
      dataIndex: 'total',
      key: 'total',
      width: 50,
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
  active: string;
}
