import { combineReducers } from 'redux';
import { authReducer } from './authReducer'
import { regReducer } from './regReducer';
import { ordersReducer } from './ordersReducer';
import { profileReducer } from './profileReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    reg: regReducer,
    orders: ordersReducer,
    profile: profileReducer,
})

export default rootReducer;