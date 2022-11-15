import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('usersApp/users/getUsers', async (routeParams, { dispatch }) => {
	dispatch(setLoading(true));
	const response = await axios.post(process.env.REACT_APP_API + '/dataInfo', {
		name: routeParams.type
	});
	const data = await response.data;
	dispatch(setLoading(false));
	return data;
});

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectContactsById } = usersAdapter.getSelectors(
	state => state.usersApp.users
);

const usersSlice = createSlice({
	name: 'usersApp/users',
	initialState: usersAdapter.getInitialState({
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
		[getUsers.fulfilled]: (state, action) => action.payload
	}
});

export const {
	setLoading,
} = usersSlice.actions;

export default usersSlice.reducer;
