// third-party
import { combineReducers } from 'redux';

import auth from './authSlice';
import role from './roleSlice';
import user from './userSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  auth,
  role,
  user,
});

export default reducers;
