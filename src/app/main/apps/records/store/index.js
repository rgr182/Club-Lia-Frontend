import { combineReducers } from '@reduxjs/toolkit';
import record from './recordSlice';

const reducer = combineReducers({
    record,
});

export default reducer;
