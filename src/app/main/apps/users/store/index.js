import { combineReducers } from '@reduxjs/toolkit';

import users from './usersSlice';
import interested from './interested';


const reducer = combineReducers({
    users,
    interested
});

export default reducer;
