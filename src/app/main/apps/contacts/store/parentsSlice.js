import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getParentsData = createAsyncThunk('contactsApp/parents/getParentsData', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/padresHijos');
	const data = await response.data;
	return data;
});

const parentsSlice = createSlice({
	name: 'contactsApp/parents',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getParentsData.fulfilled]: (state, action) => action.payload
	}
});

export default parentsSlice.reducer;
