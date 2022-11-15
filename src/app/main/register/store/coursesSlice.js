import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCourses = createAsyncThunk('pricingApp/courses/getCourses', async (id) => {
	const response = await axios.get(process.env.REACT_APP_API+'/thinkific/courses/' + id,{
	});
	const data = await response.data;
	return data;
});

const coursesAdapter = createEntityAdapter({});

const coursesSlice = createSlice({
	name: 'pricingApp/courses',
	initialState: coursesAdapter.getInitialState({
		data: {}
	}),
	reducers: {
		resetList(state) {
			state.data = {};
		},
	},
	extraReducers: {
		[getCourses.fulfilled]: (state, action) => {
			state.data = action.payload;
		}
	}
});

export const { resetList } = coursesSlice.actions;

export default coursesSlice.reducer;


