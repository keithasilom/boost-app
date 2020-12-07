import loggedReducer from './loggedReducer';
import userDetailsReducer from './userDetailsReducer';
import { payPeriodReducer } from './payDetailsReducer';

import { combineReducers } from 'redux';

const boostReducers = combineReducers({
    isLogged: loggedReducer,
    userDetails: userDetailsReducer,
    payPeriod: payPeriodReducer
});

export default boostReducers;