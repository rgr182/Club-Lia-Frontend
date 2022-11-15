import { combineReducers } from '@reduxjs/toolkit';
import items from './itemSlice';
import filter from './filterSlice';

const reducer = combineReducers({
	items,
	filter
});

export default reducer;
