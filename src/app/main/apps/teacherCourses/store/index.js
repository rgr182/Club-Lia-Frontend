import { combineReducers } from '@reduxjs/toolkit';
import teacherCourses from './teacherCoursesSlice';
import filter from './filterSlice';

const reducer = combineReducers({
	teacherCourses,
    filter
});

export default reducer;