// third-party
import { combineReducers } from 'redux';

import auth from './authSlice';
import role from './roleSlice';
import user from './userSlice';

import staff from './staffSlice';
import position from './positionSlice';
import shift from './shiftSlice';
import shift_detail from './shift_detailSlice';
import shift_user_detail from './shift_user_detailSlice';
import work_shift from './workshiftSlice';
import attendance from './attendanceSlice';
import salary from './salarySlice';

import logger from './loggerSlice';

import product from './productSlices';
import product_type from './product_typeSlices';
import product_import from './product_importSlice';
import product_import_detail from './product_import_detailSlice';
import area from './areaSlice';
import service_type from './service_type_slice';
import customer from './customer_slice';
import price from './priceSlice';
import kitchen_order from './kitchen_order_slice';
import device from './device_slice';
import supplier from './supplier_slice';
import service from './serviceSlice';
import service_device_detail from './service_device_detail_slice';
import kitchen_order_notification from './kitchen_order_notification_slice';
import order from './orderSlice';
import dayoff from './dayoffSlice';
import invoice from './invoiceSlice';
import statistical from './statisticalSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  auth,
  role,
  user,
  staff,
  position,
  logger,
  product,
  service_type,
  product_import,
  product_type,
  customer,
  area,
  supplier,
  price,
  device,
  shift,
  product_import_detail,
  service,
  shift_detail,
  shift_user_detail,
  work_shift,
  attendance,
  order,
  kitchen_order,
  service_device_detail,
  salary,
  dayoff,
  kitchen_order_notification,
  invoice,
  statistical,
});

export default reducers;
