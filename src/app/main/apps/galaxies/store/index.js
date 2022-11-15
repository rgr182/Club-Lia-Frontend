import { combineReducers } from '@reduxjs/toolkit';
import subjects from './subjectsSlice';


const reducer = combineReducers({
    subjects,
});

export default reducer;
