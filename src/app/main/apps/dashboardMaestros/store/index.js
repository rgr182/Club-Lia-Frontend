import { combineReducers } from '@reduxjs/toolkit';
import clases from './clasesSlice';
import alumnos from './alumnosSlice';

const reducer = combineReducers({
	clases,
	alumnos
});

export default reducer;
