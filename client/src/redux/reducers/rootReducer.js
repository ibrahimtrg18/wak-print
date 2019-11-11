import { combineReducers } from 'redux';
import { authReducer } from './authReducer'
import { regReducer } from './regReducer';
import { orderReducer } from './orderReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  reg: regReducer,
  order: orderReducer
})

export default rootReducer;