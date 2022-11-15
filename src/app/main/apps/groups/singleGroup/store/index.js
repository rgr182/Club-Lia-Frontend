import { combineReducers } from '@reduxjs/toolkit';
import singlegroup from './singleGroupSlice'
import subject from './subjectSlice';
import students from './studentsSlice';

const reducer = combineReducers({
    singlegroup,
    subject,
    students
});

export default reducer;
