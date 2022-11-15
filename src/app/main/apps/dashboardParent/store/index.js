import { combineReducers } from '@reduxjs/toolkit';
import courses from './coursesSlice';

const reducer = combineReducers({
	courses
});

export default reducer;
