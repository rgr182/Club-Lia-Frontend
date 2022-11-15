import { combineReducers } from '@reduxjs/toolkit';
import homework from './homeworkSlice';
import teachers from './teacherSlice';

const reducer = combineReducers({
    homework,
	teachers,
});

export default reducer;
