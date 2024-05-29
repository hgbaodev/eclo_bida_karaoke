// third-party
import { combineReducers } from 'redux';

import auth from './authSlice';
import role from './roleSlice';
import user from './userSlice';
import logger from './loggerSlice';
import area from './areaSlice';
import device from './deviceSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  auth,
  role,
  user,
  logger,
  area,
  device,
});

export default reducers;
