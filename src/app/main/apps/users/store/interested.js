import axios from 'axios';

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

export const getInterested = createAsyncThunk('interested/users/getInterested', async (routeParams, { dispatch }) => {
	dispatch(setLoading(true));
	const response = await axios.get(process.env.REACT_APP_API + '/interested');
	const data = await response.data;
	dispatch(setLoading(false));
	return data;
});

const interestedAdapter = createEntityAdapter({});

export const { selectAll: selectInterested, } = interestedAdapter.getSelectors(
	state => state.interested.users
);

const interestedSlice = createSlice({
	name: 'interested/users',
	initialState: interestedAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		loading: true,
	}),
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
	extraReducers: {
		[getInterested.fulfilled]: (state, action) => action.payload
	}
});

export const {
	setLoading,
} = interestedSlice.actions;

export default interestedSlice.reducer;
