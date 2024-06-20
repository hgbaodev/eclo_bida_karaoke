'use client';
import PageHeader from '@/app/shared/page-header';
import { dispatch } from '@/store';
import { getAreas } from '@/store/slices/orderSlice';
import { RootState } from '@/store/types';
import { useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Dropdown, Text } from 'rizzui';
import { Tab } from 'rizzui';

const pageHeader = {
  title: 'Table & Rooms',
  breadcrumb: [
    {
      href: '/admin',
      name: 'Analytics',
    },
    {
      name: 'Table & rooms',
    },
  ],
};

export default function BlankPage() {
  const { areas } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getAreas());
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Tab>
        <Tab.List>
          {areas.map((area) => (
            <Tab.ListItem key={area.active}>{area.name}</Tab.ListItem>
          ))}
        </Tab.List>
        <Tab.Panels>
          {areas.map((area) => (
            <Tab.Panel key={area.active}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {area.services.map((service: any) => (
                  <div
                    key={service.active}
                    className={`relative border h-[100px] flex items-center justify-center rounded px-4 py-2 ${
                      service.is_booked ? 'bg-red-300' : 'bg-green-300'
                    }`}
                  >
                    <Dropdown placement="right-start" className="absolute top-1 right-1 cursor-pointer">
                      <Dropdown.Trigger>
                        <MdMoreHoriz
                          className="size-5 mb-2"
                          onClick={() => console.log('service ' + service.active + ' clicked')}
                        />
                      </Dropdown.Trigger>
                      <Dropdown.Menu className="!z-0">
                        {service.is_booked ? (
                          <>
                            <Dropdown.Item className="gap-2 text-xs sm:text-sm">Pay</Dropdown.Item>
                          </>
                        ) : (
                          <Dropdown.Item className="gap-2 text-xs sm:text-sm">Order</Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Text className="font-bold">{service.name}</Text>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab>
    </>
  );
}
