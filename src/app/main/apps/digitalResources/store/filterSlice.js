import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getResources} from "./resourcesSlice";

const filterSlice = createSlice({
	name: 'filterApp',
	initialState: {},
	reducers: {
		setResourcesFilter: (state, action) => {
			state.resources = action.payload;
		},

	},
});

export const {
	setResourcesFilter
} = filterSlice.actions;

export default filterSlice.reducer;
