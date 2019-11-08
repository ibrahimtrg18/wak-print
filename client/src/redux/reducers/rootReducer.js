import { combineReducers } from 'redux';
import { authReducer } from './authReducer'
import { regReducer } from './regReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  reg: regReducer
})

export default rootReducer;