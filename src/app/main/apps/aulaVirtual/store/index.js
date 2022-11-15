import { combineReducers } from '@reduxjs/toolkit';
import aulaVirtual from './aulaSlice';
import resources from './resourcesSlice';
import npresources from './nonPlannedResourcesSlice';
import subjects from './subjectsSlice';

const reducer = combineReducers({
    aulaVirtual,
    resources,
    npresources,
    subjects
});

export default reducer;
