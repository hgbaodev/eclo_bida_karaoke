// third-party
import { combineReducers } from 'redux';

import auth from './authSlice';
import role from './roleSlice';
import user from './userSlice';
import logger from './loggerSlice';
import area from './areaSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  auth,
  role,
  user,
  logger,
  area,
});

export default reducers;
