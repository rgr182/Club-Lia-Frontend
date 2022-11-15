import { combineReducers } from '@reduxjs/toolkit';
import tareasPendientes from './tareasPendientesSlice';
import tareasEntregadas from './tareasEntregadasSlice';
import tareasCalificadas from './tareasCalificadasSlice'
import panel from './panelSlice';
import calendar from './calendarSlice';
import miTarea from './miTarea';
import record from './recordSlice';
import courses from './coursesSlice';
import subjectCalendarSlice from "./subjectCalendarSlice";

const reducer = combineReducers({
	tareasPendientes,
	tareasEntregadas,
	tareasCalificadas,
	panel,
	calendar,
	miTarea,
	record,
	courses,
	subjectCalendarSlice,
});

export default reducer;
