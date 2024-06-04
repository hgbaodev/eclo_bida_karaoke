// third-party
import { combineReducers } from 'redux';

import auth from './authSlice';
import role from './roleSlice';
import user from './userSlice';

import staff from './staffSlice';
import position from './positionSlice';
import shift from './shiftSlice';

import logger from './loggerSlice';

import product from './productSlices';
import product_import from './product_importSlice';
import area from './areaSlice';
import service_type from './serviceTypeSlice';

import customer from './customerSlice';

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
  device,
  shift,
});

export default reducers;
