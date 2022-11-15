import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import register from './registerSlice';
import user from './userSlice';
import redirect from './redirectSlice';

const authReducers = combineReducers({
	user,
	login,
	register,
	redirect
});

export default authReducers;
