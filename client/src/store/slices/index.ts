// third-party
import { combineReducers } from 'redux';

import auth from './authSlice';
import role from './roleSlice';
import user from './userSlice';

import staff from './staffSlice';
import position from './positionSlice';
import shift from './shiftSlice';

import logger from './loggerSlice';
import area from './areaSlice';

import customer from './customerSlice';

import device from './deviceSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  auth,
  role,
  user,
  staff,
  position,
  logger,
  customer,
  area,
  device,
  shift,
});

export default reducers;
