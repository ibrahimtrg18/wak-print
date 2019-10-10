import { combineReducers } from 'redux';
import authReducer from './authReducer';
import pesananReducer from './pesananReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    pesanan: pesananReducer
})

export default rootReducer;