import { combineReducers } from '@reduxjs/toolkit';
import resources from './resourceSlice';
import verifyURL from './verifyURLSlice';


const reducer = combineReducers({
    resources,
    verifyURL
	
});

export default reducer;