import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGroupsInfo = createAsyncThunk('contactsApp/groups/getGroups', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/grupos',{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});

const groupSlice = createSlice({
	name: 'contactsApp/groups',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getGroupsInfo.fulfilled]: (state, action) => action.payload
	}
});

export default groupSlice.reducer;