// third-party
import { combineReducers } from 'redux';

import auth from './authSlice';
import role from './roleSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  auth,
  role,
});

export default reducers;
