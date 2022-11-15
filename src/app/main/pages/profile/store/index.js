import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import profileParent from './profileParentSlice';

const reducer = combineReducers({
	profile,
	profileParent
});

export default reducer;
