'use client';

import { HeaderCell } from '@/components/ui/table';
import { dispatch } from '@/store';
import { getOrder, setIsView } from '@/store/slices/orderSlice';
import { FaEye } from 'react-icons/fa6';
import { ActionIcon, Text, Tooltip } from 'rizzui';
import PayOrder from '../../modal/pay_order';

export const getColumns = (openModal: any, t: any) => [
  {
    title: <HeaderCell title={t('no')} />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (_: any, invoice: Invoice, index: number) => <div className="inline-flex ps-3">{index + 1}</div>,
  },
  {
    title: <HeaderCell title={t('check_in')} />,
    dataIndex: 'checkin_time',
    key: 'checkin_time',
    width: 50,
    render: (checkin_time: string) => <Text className="text-sm">{checkin_time}</Text>,
  },
  {
    title: <HeaderCell title={t('check_out')} />,
    dataIndex: 'checkout_time',
    key: 'checkout_time',
    width: 50,
    render: (checkout_time: string) => <Text className="text-sm">{checkout_time}</Text>,
  },
  {
    title: <HeaderCell title={t('service_name')} />,
    dataIndex: 'service_name',
    key: 'service_name',
    width: 50,
    render: (_: any, invoice: Invoice) => <div className="inline-flex ps-3">{invoice.service.name}</div>,
  },
  {
    title: <HeaderCell title={t('total_price')} />,
    dataIndex: 'total_price',
    key: 'total_price',
    width: 50,
    render: (total_price: string) => (
      <Text as="b" className="text-sm">
        {total_price} $
      </Text>
    ),
  },
  {
    title: <HeaderCell title={t('action')} />,
    dataIndex: 'action',
    key: 'action',
    width: 10,
    render: (_: string, invoice: Invoice) => (
      <Tooltip size="sm" content={'View this order'} placement="top" color="invert">
        <ActionIcon
          onClick={async () => {
            await dispatch(getOrder(invoice.active));
            dispatch(setIsView(true));
            openModal({ view: <PayOrder />, customSize: '660px' });
          }}
          as="span"
          size="sm"
          variant="outline"
          className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
        >
          <FaEye className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    ),
  },
];

interface Invoice {
  active: string;
  service_id: number;
  checkin_time: string;
  checkout_time: string;
  user_id: number;
  customer_id: number;
  status: string;
  total_price: number;
  service: {
    name: string;
    description: string;
    status: string;
    active: string;
    created_at: string;
  };
  customer: {
    first_name: string;
    last_name: string;
    status: string;
    image: string;
    phone: string;
    email: string;
    active: string;
  };
}
