import { combineReducers } from '@reduxjs/toolkit';
import group from './groupSlice';
import teachers from './teacherSlice';
import token from './tokenSlice';
import groupstudents from './contactsSlice';
import student from './studentSlice.js';
import filter from './filterSlice';

const reducer = combineReducers({
    group,
	teachers,
    token,
    groupstudents,
    student,
    filter
});

export default reducer;
