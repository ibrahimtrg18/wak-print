import { combineReducers } from 'redux';
import { authReducer } from './authReducer'
import { regReducer } from './regReducer';
import { orderReducer } from './orderReducer';
import { profileReducer } from './profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  reg: regReducer,
  order: orderReducer,
  profile: profileReducer,
})

export default rootReducer;