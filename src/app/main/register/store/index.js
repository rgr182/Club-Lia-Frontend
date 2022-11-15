import { combineReducers } from '@reduxjs/toolkit';
import pricing from './pricingSlice';
import register from './registerSlice';
import courses from './coursesSlice';
// import files from './filesSlice';


const reducer = combineReducers({
    pricing,
    register,
    courses
});

export default reducer;
