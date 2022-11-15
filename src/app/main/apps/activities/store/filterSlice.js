import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getActivities} from "./activitiesSlice";

const filterSlice = createSlice({
	name: 'filterApp',
	initialState: {},
	reducers: {
		setActivitiesFilter: (state, action) => {
			state.activity = action.payload;
		}

	},
});

export const {
	setActivitiesFilter
} = filterSlice.actions;

export default filterSlice.reducer;
