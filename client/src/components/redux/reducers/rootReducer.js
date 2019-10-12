import { combineReducers } from 'redux';
import * as authReducer from './authReducer';
import * as pesananReducer from './pesananReducer';

const rootReducer = combineReducers({
    auth: authReducer.authReducer,
    pesanan: pesananReducer.pesananReducer
})

export default rootReducer;