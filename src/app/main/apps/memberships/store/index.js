import { combineReducers } from '@reduxjs/toolkit';
import pricing from './pricingSlice';

const reducer = combineReducers({
    pricing,
});

export default reducer;
