import { combineReducers } from '@reduxjs/toolkit';
import calendar from './calendarSlice';
import token from './tokenSlice';
import categoriesResources from './categoriesResourcesSlice';
import event from './eventsSlice';

const reducer = combineReducers({
    calendar,
    event,
    categoriesResources,
    token
});

export default reducer;