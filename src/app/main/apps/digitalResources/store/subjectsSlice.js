import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import subjectSlice from '../../subjects/store/subjectSlice';

export const getSubjects = createAsyncThunk('ResourcesApp/subjects/getSubjects', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/materias');
	const data = await response.data;
	return data;
});

const subjectsSlice = createSlice({
	name: 'ResourcesApp/subjects',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getSubjects.fulfilled]: (state, action) => action.payload
	}
});

export default subjectsSlice.reducer;