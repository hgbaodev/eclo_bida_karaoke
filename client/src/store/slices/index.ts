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

import logger from './loggerSlice';

import product from './productSlices';
import product_import from './product_importSlice';
import area from './areaSlice';
import service_type from './serviceTypeSlice';

import customer from './customerSlice';
import price from './priceSlice';

import device from './deviceSlice';
import supplier from './supplierSlice';

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
  customer,
  area,
  supplier,
  price,
  device,
  shift,
  shift_detail,
  shift_user_detail,
  work_shift,
});

export default reducers;
