import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getCalendar = createAsyncThunk('PreescolarApp/calendar/getCalendarInfo', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/activity/count',{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});


const calendarAdapter = createEntityAdapter({});

export const { selectAll: selectCalendar, selectById: selectCalendarById } = calendarAdapter.getSelectors(
	state => state.PreescolarApp.calendar
);
const calendarSlice = createSlice({
	name: 'PreescolarApp/calendar',
	initialState: calendarAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		calendarDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		// calendar: {
		// 	success: false,
		// 	response: false,
		// 	error: null
		// }
	}),
	reducers: {
		setGroupsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openCalendarDialog: (state, action) => {
			state.calendarDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeCalendarDialog: (state, action) => {
			state.calendarDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		// registerSuccess: (state, action) => {
		// 	state.calendar = {
		// 		success: true,
		// 		response: action.payload,
		// 	};	
		// },
		// registerError: (state, action) => {
		// 	state.calendar = {
		// 		success: false,
		// 		error: action.payload,
		// 		// error: true
		// 	};	
		// },
		// registerReset: (state, action) => {
		// 	state.calendar = {
		// 		success: false,
		// 		error: null,
		// 	};	
		// },
	},
	extraReducers: {

		[getCalendar.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			state.data = data;
			// calendarAdapter.setAll(state, data);
			// state.routeParams = routeParams;
			// state.searchText = '';
		}
	}
});

export const {
	// setGroupsSearchText,
	// openNewGroupDialog,
	// closeNewGroupDialog,
	// registerSuccess,
	// registerError,
	// registerReset,
	openCalendarDialog,
	closeCalendarDialog,
} = calendarSlice.actions;


export default calendarSlice.reducer;
