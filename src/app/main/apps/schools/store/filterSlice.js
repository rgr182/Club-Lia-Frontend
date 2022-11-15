import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
	name: 'filterApp',
	initialState: {},
	reducers: {
		setSchoolFilter: (state, action) => {
			state.school_active = action.payload.school_active;
		},
	},
});

export const {
	setSchoolFilter
} = filterSlice.actions;

export default filterSlice.reducer;
