import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
	name: 'filterApp',
	initialState: {},
	reducers: {
		setStudentsFilter: (state, action) => {
			state.filter = action.payload;
		}

	},
});

export const {
	setStudentsFilter
} = filterSlice.actions;

export default filterSlice.reducer;
