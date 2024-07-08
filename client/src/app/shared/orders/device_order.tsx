import ControlledTable from '@/components/controlled-table';
import AvatarCard from '@/components/ui/avatar-card';
import { HeaderCell } from '@/components/ui/table';
import env from '@/env';
import { useColumn } from '@/hooks/use-column';
import { dispatch } from '@/store';
import { changeQuantityDevice } from '@/store/slices/orderSlice';
import { RootState } from '@/store/types';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ActionIcon, Loader } from 'rizzui';
import { IoIosAdd } from 'react-icons/io';
import { VscChromeMinimize } from 'react-icons/vsc';
import toast from 'react-hot-toast';

const TableDeviceOrder = () => {
  const { order, isLoadingGetOrder } = useSelector((state: RootState) => state.order);
  const columns = useMemo(
    () => [
      {
        title: <HeaderCell title="Image" />,
        dataIndex: 'image',
        key: 'image',
        width: 20,
        render: (_: any, orderdevicedetail: DeviceDetail) => (
          <AvatarCard
            src={env.API_STORAGE + orderdevicedetail.image}
            avatarProps={{
              name: orderdevicedetail.image,
              size: 'lg',
              className: 'rounded-lg',
            }}
            name={''}
          />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 50,
        render: (_: any, orderdevicedetail: DeviceDetail) => orderdevicedetail.name,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'selling_price',
        width: 10,
        render: (_: any, orderdevicedetail: DeviceDetail) => orderdevicedetail.selling_price,
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 10,
        render: (_: any, orderdevicedetail: DeviceDetail) => orderdevicedetail.quantity,
      },
      {
        title: <></>,
        dataIndex: 'action',
        key: 'action',
        width: 10,
        render: (_: string, orderdevicedetail: DeviceDetail) => (
          <div className="flex items-center justify-end gap-3 pe-3">
            <ActionIcon
              onClick={() => {
                const value = orderdevicedetail.quantity - 1;
                if (value == 0) {
                  const check = confirm('Are you sure you want to delete this device?');
                  if (!check) {
                    return;
                  }
                }
                const data = {
                  active: orderdevicedetail.active,
                  quantity: value,
                };
                dispatch(changeQuantityDevice(data));
              }}
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
            >
              <VscChromeMinimize className="h-4 w-4" />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                if (orderdevicedetail.quantity + 1 > orderdevicedetail.total_stock) {
                  toast.error('Device out of stock');
                  return;
                }
                const data = {
                  active: orderdevicedetail.active,
                  quantity: orderdevicedetail.quantity + 1,
                };
                dispatch(changeQuantityDevice(data));
              }}
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700 cursor-pointer"
            >
              <IoIosAdd className="h-4 w-4" />
            </ActionIcon>
          </div>
        ),
      },
    ],
    [],
  );
  const { visibleColumns } = useColumn(columns);
  if (isLoadingGetOrder) {
    return (
      <div className="flex justify-center items-center">
        <Loader variant="spinner" size="xl" color="info" />
      </div>
    );
  }
  return (
    <ControlledTable
      variant="minimal"
      data={order?.devices}
      showLoadingText={false}
      // @ts-ignore
      columns={visibleColumns}
      emptyText={
        <div className="flex justify-center items-center">
          <div className="w-[60px] h-[50px]">
            <svg viewBox="0 0 16 16" version="1.1">
              <g>
                <path d="M6.7154047,3.14360313 C6.42645779,3.14360313 6.19321149,2.91035683 6.19321149,2.62140992 C6.19321149,2.33246301 6.42645779,2.09921671 6.7154047,2.09921671 L8.2924282,2.09921671 L8.2924282,0.522193211 C8.2924282,0.233246301 8.5256745,0 8.81462141,0 C9.10356832,0 9.33681462,0.233246301 9.33681462,0.522193211 L9.33681462,2.09921671 L10.9138381,2.09921671 C11.202785,2.09921671 11.4360313,2.33246301 11.4360313,2.62140992 C11.4360313,2.91035683 11.202785,3.14360313 10.9138381,3.14360313 L9.33681462,3.14360313 L9.33681462,4.72062663 C9.33681462,5.00957354 9.10356832,5.24281984 8.81462141,5.24281984 C8.5256745,5.24281984 8.2924282,5.00957354 8.2924282,4.72062663 L8.2924282,3.14360313 L6.7154047,3.14360313 Z M12.4421236,13.8938207 C13.0200174,13.8938207 13.4899913,14.3672759 13.4899913,14.9451697 C13.4899913,15.5265448 13.0200174,16 12.4421236,16 C11.8642298,16 11.3977372,15.5265448 11.3977372,14.9451697 C11.3977372,14.3672759 11.8642298,13.8938207 12.4421236,13.8938207 Z M6.13402959,13.8938207 C6.70844212,13.8938207 7.17841601,14.3672759 7.17841601,14.9451697 C7.17841601,15.5265448 6.70844212,16 6.13402959,16 C5.55613577,16 5.08616188,15.5265448 5.08616188,14.9451697 C5.08616188,14.3672759 5.55613577,13.8938207 6.13402959,13.8938207 Z M13.1279373,11.721497 L5.256745,11.721497 L4.09747607,7.29329852 L14.1479547,7.30374238 L13.1279373,11.721497 Z M15.2132289,6.45778938 C15.1122715,6.33246301 14.9625762,6.25935596 14.8024369,6.25935596 L3.82245431,6.2489121 L3.48825065,4.96779809 C3.42906876,4.73803307 3.22019147,4.57789382 2.98346388,4.57789382 L0.522193211,4.57789382 C0.233246301,4.57789382 0,4.81114012 0,5.10008703 C0,5.38903394 0.233246301,5.62228024 0.522193211,5.62228024 L2.57963446,5.62228024 L2.91383812,6.8894691 C2.91383812,6.89991297 2.91731941,6.90687554 2.91731941,6.91383812 L4.34812881,12.3759791 C4.4073107,12.6057441 4.61618799,12.7658834 4.85291558,12.7658834 L13.5456919,12.7658834 C13.7893821,12.7658834 13.9982594,12.5987815 14.05396,12.362054 L15.310705,6.89991297 C15.3489991,6.743255 15.310705,6.58311575 15.2132289,6.45778938 Z"></path>
              </g>
            </svg>
          </div>
        </div>
      }
      className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
    />
  );
};

export default TableDeviceOrder;

export interface DeviceDetail {
  active: string;
  name: string;
  image: string;
  quantity: number;
  selling_price: number;
  total_stock: number;
}
