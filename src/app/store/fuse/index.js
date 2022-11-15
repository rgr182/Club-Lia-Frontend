import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import message from './messageSlice';
import navbar from './navbarSlice';
import navigation from './navigationSlice';
import settings from './settingsSlice';
import sound from './soundSlice';
import avatar from './avatarSlice';
import input from './inputMaestroSlice';

const fuseReducers = combineReducers({
	navigation,
	settings,
	navbar,
	message,
	avatar,
	sound,
	dialog,
	input
});

export default fuseReducers;
