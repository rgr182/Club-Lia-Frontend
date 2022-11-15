import { combineReducers } from '@reduxjs/toolkit';
import resources from './resourcesSlice';
import categories from './categorySlice';
import subjects from './subjectsSlice';
import filter from './filterSlice';

const reducer = combineReducers({
	resources,
    categories,
    subjects,
    filter
});

export default reducer;