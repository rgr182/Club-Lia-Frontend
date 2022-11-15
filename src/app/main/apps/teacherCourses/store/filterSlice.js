import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
	name: 'TeacherCoursesApp/filterApp',
	initialState: {
		progress: ''
	},
	reducers: {
		setCoursesFilter: (state, action) => {
			state.progress = action.payload;
		},
	},
});

export const { setCoursesFilter } = filterSlice.actions;

export default filterSlice.reducer;
