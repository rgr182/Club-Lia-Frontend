import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSubjects = createAsyncThunk('aulaApp/subjects/getSubjects', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/materias');
	const data = await response.data;
	return data;
});

const subjectsSlice = createSlice({
	name: 'aulaApp/subjects',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getSubjects.fulfilled]: (state, action) => action.payload
	}
});

export default subjectsSlice.reducer;