import { combineReducers } from '@reduxjs/toolkit';
import course from './courseSlice';
import courses from './coursesSlice';
import categories from './categoriesSlice';
import activities from './activitiesSlice'; 
import groups from './groupSlice'; 
import delivery from './deliverySlice';
import filter from './filterSlice';
import categoriesResources from './categoriesResourcesSlice';
import customsubjects from './customsubjectSlice';

const reducer = combineReducers({
	categories,
	// courses,
	course,
	activities,
	groups,
	delivery,
	filter,
	categoriesResources,
	customsubjects
});

export default reducer;
