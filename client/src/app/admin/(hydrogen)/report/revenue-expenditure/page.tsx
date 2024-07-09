'use client';
import PageHeader from '@/app/[locale]/shared/page-header';
import TableRevenueEx from '@/app/[locale]/shared/revenue-expenditure/table_revenue_expenditure';
import { ActionIcon, Button, Drawer, Text } from 'rizzui';
import { FaFilter } from 'react-icons/fa6';
import React, { useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { DatePicker } from '@/components/ui/datepicker';
import dayjs from 'dayjs';
import { dispatch } from '@/store';
import { getRevenueEx } from '@/store/slices/statisticalSlice';

const pageHeader = {
  title: 'Revenue Expenditure',
  breadcrumb: [
    {
      href: '#',
      name: 'Report',
    },
    {
      name: 'Revenue Expenditure',
    },
  ],
};

export default function BlankPage() {
  const [drawerState, setDrawerState] = React.useState(false);
  const [starRangeDate, setStartRangeDate] = React.useState<Date | null>(null);
  const [endRangeDate, setEndRangeDate] = React.useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const dayBeforeToday = new Date(now);
    dayBeforeToday.setDate(now.getDate() - 1);

    setStartRangeDate(firstDayOfMonth);
    setEndRangeDate(dayBeforeToday);
  }, []);

  useEffect(() => {
    const startDay = dayjs(starRangeDate).format('YYYY-MM-DD');
    const endDay = dayjs(endRangeDate).format('YYYY-MM-DD');
    const value = {
      start_day: startDay,
      end_day: endDay,
    };
    dispatch(getRevenueEx(value));
  }, [starRangeDate, endRangeDate]);

  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartRangeDate(start);
    setEndRangeDate(end);
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button color="primary" onClick={() => setDrawerState(true)}>
          <FaFilter strokeWidth="1" className="h-4 w-4 mr-2" /> <span> Add Condition</span>{' '}
        </Button>
        <Drawer isOpen={drawerState} onClose={() => setDrawerState(false)}>
          <div className="card">
            <div className="card-header flex justify-between px-8 py-4 bg-primary">
              <h3 className="card-title text-white">Filter</h3>
              <div className="card-options">
                <ActionIcon onClick={() => setDrawerState(false)} rounded="full">
                  <IoIosClose className="w-5 h-5" />
                </ActionIcon>
              </div>
            </div>
            <div className="card-body px-8 py-4">
              <div className="flex flex-col space-y-3">
                <Text>Choose Date</Text>
                <DatePicker
                  selected={starRangeDate}
                  onChange={handleRangeChange}
                  startDate={starRangeDate}
                  endDate={endRangeDate}
                  monthsShown={2}
                  placeholderText="Select Date in a Range"
                  selectsRange
                />
              </div>
              <div className="card-footer mt-[50px] flex justify-end">
                <Button
                  color="primary"
                  onClick={() => {
                    if (starRangeDate && endRangeDate) {
                      setDrawerState(false);
                    } else {
                      alert('Please select a date range');
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
      </PageHeader>
      <TableRevenueEx />
    </>
  );
}
