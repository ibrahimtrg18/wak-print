import { combineReducers } from 'redux';
import { authReducer } from './authReducer'
import { regReducer } from './regReducer';
import { profileReducer } from './profileReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    reg: regReducer,
    profile: profileReducer,
})

export default rootReducer;