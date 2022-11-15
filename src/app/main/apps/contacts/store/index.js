import { combineReducers } from '@reduxjs/toolkit';
import contacts from './contactsSlice';
import user from './userSlice';
import schools from './schoolsSlice';
import roles from './rolesSlice';
import filter from './filterSlice';
import groups from './groupSlice';
import parents from './parentsSlice';

const reducer = combineReducers({
	contacts,
	user,
	schools,
	roles,
	filter,
	groups,
	parents
});

export default reducer;
