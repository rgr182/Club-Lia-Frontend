import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getGroups = createAsyncThunk('activitiesApp/groups/getGroups', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/actividades/grupos',{
	});
	const data = await response.data;
	return data;
});

const groupSlice = createSlice({
	name: 'activitiesApp/groups',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getGroups.fulfilled]: (state, action) => action.payload
	}
});

export default groupSlice.reducer;


