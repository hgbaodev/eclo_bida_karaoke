'use client';

import { dispatch } from '@/store';
import { createOrder } from '@/store/slices/orderSlice';
import { useEffect, useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { Dropdown, Text } from 'rizzui';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const ServiceCard = ({ service }: { service: any }) => {
  const navigate = useRouter();
  const [secondsElapsed, setSecondsElapsed] = useState('');

  useEffect(() => {
    if (service.is_booked && service.checkin_time) {
      const intervalId = setInterval(() => {
        const now = dayjs();
        const checkinTime = dayjs(service.checkin_time);
        const diffInSeconds = now.diff(checkinTime, 'second');

        // Chuyển đổi số giây thành định dạng giờ:phút:giây
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;

        // Định dạng số để luôn hiển thị hai chữ số
        const formattedTime = [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');

        setSecondsElapsed(formattedTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [service]);

  return (
    <div
      key={service.active}
      className={`relative border h-[100px] flex items-center justify-center rounded px-4 py-2 ${
        service.is_booked ? 'bg-red-300' : 'bg-green-300'
      }`}
    >
      <Dropdown placement="right-start" className="absolute top-1 right-1 cursor-pointer">
        <Dropdown.Trigger>
          <MdMoreHoriz className="size-5 mb-2" onClick={() => console.log('service ' + service.active + ' clicked')} />
        </Dropdown.Trigger>
        <Dropdown.Menu className="!z-0">
          {service.is_booked ? (
            <Dropdown.Item
              onClick={() => navigate.push(`/admin/orders/${service?.order_active}`)}
              className="gap-2 text-xs sm:text-sm"
            >
              Pay
            </Dropdown.Item>
          ) : (
            <Dropdown.Item
              onClick={async () => {
                const result = await dispatch(createOrder(service?.active));
                if (createOrder.fulfilled.match(result)) {
                  navigate.push(`/admin/orders/${result.payload.data.active}`);
                } else {
                  toast.error('Failed to create order');
                }
              }}
              className="gap-2 text-xs sm:text-sm"
            >
              Order
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <div className="flex flex-col justify-center items-center">
        <Text className="font-bold">{service.name}</Text>
        {service.is_booked && <Text className="font-bold text-white">Time Elapsed: {secondsElapsed}</Text>}
      </div>
    </div>
  );
};

export default ServiceCard;
