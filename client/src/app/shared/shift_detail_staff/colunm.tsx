'use client';
import React from 'react';
import AvatarCard from '@/components/ui/avatar-card';
// import { STATUSES, type User } from '@/data/users-data';
import { HeaderCell } from '@/components/ui/table';
import { Select } from 'rizzui';

export const getColumns = (openModal: (args: any) => void) => [
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'fullName',
    key: 'fullName',
    width: 50,
    render: (_: string, staff: Staff) => <AvatarCard src={staff.image} name={staff.name} description={staff.idcard} />,
  },

  {
    title: <HeaderCell title="T2" />,
    dataIndex: 'mon',
    key: 'mon',
    width: 100,
    render: (_: string, staff: Staff) => (
      <Select
        options={['a']}
        // value={value}
        // onChange={onChange}
        placeholder="Select a shift"
        className="col-span-full"
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) => option.value}
        displayValue={(selected: any) => selected}
        dropdownClassName="!z-[1]"
        inPortal={false}
      />
    ),
  },
  {
    title: <HeaderCell title="T3" />,
    dataIndex: 'tue',
    key: 'tue',
    width: 100,
    render: (_: string, staff: Staff) => (
      <Select
        options={['a']}
        // value={value}
        // onChange={onChange}
        placeholder="Select a shift"
        className="col-span-full"
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) => option.value}
        displayValue={(selected: any) => selected}
        dropdownClassName="!z-[1]"
        inPortal={false}
      />
    ),
  },
  {
    title: <HeaderCell title="T4" />,
    dataIndex: 'wed',
    key: 'wed',
    width: 100,
    render: (_: string, staff: Staff) => (
      <Select
        options={['a']}
        // value={value}
        // onChange={onChange}
        placeholder="Select a shift"
        className="col-span-full"
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) => option.value}
        displayValue={(selected: any) => selected}
        dropdownClassName="!z-[1]"
        inPortal={false}
      />
    ),
  },
  {
    title: <HeaderCell title="T5" />,
    dataIndex: 'thu',
    key: 'thu',
    width: 100,
    render: (_: string, staff: Staff) => (
      <Select
        options={['a']}
        // value={value}
        // onChange={onChange}
        placeholder="Select a shift"
        className="col-span-full"
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) => option.value}
        displayValue={(selected: any) => selected}
        dropdownClassName="!z-[1]"
        inPortal={false}
      />
    ),
  },
  {
    title: <HeaderCell title="T6" />,
    dataIndex: 'fri',
    key: 'fri',
    width: 100,
    render: (_: string, staff: Staff) => (
      <Select
        options={['a']}
        // value={value}
        // onChange={onChange}
        placeholder="Select a shift"
        className="col-span-full"
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) => option.value}
        displayValue={(selected: any) => selected}
        dropdownClassName="!z-[1]"
        inPortal={false}
      />
    ),
  },
  {
    title: <HeaderCell title="T7" />,
    dataIndex: 'sat',
    key: 'sat',
    width: 100,
    render: (_: string, staff: Staff) => (
      <Select
        options={['a']}
        // value={value}
        // onChange={onChange}
        placeholder="Select a shift"
        className="col-span-full"
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) => option.value}
        displayValue={(selected: any) => selected}
        dropdownClassName="!z-[1]"
        inPortal={false}
      />
    ),
  },
  {
    title: <HeaderCell title="CN" />,
    dataIndex: 'sun',
    key: 'sun',
    width: 100,
    render: (_: string, staff: Staff) => (
      <Select
        options={['a']}
        // value={value}
        // onChange={onChange}
        placeholder="Select a shift"
        className="col-span-full"
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) => option.value}
        displayValue={(selected: any) => selected}
        dropdownClassName="!z-[1]"
        inPortal={false}
      />
    ),
  },
];

export interface Staff {
  active: string;
  name: string;
  phone: string;
  image: string;
  idcard: string;
  birthday: string;
  status: any;
  address: string;
  position: {
    name: string;
    active: string;
  };
  created_at: string;
}
export const STATUSES = {
  Active: 'A',
  InActive: 'D',
} as const;
