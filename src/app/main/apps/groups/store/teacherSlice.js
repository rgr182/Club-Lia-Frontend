import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getGroups } from './groupSlice';

export const getTeacherInfo = createAsyncThunk('teachersApp/teachers/getTeachersData', async () => {
	const response = await axios.get(`${process.env.REACT_APP_API}/maestros`);
	const data = await response.data;
	return data;
});

export const getStudentInfo = createAsyncThunk('teachersApp/teachers/getStudentsInfo', async () => {
	const response = await axios.get(`${process.env.REACT_APP_API}/studentsT`);
	const data = await response.data;
	return data;
});

const teacherSlice = createSlice({
	name: 'teachersApp/teachers',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getTeacherInfo.fulfilled]: (state, action) => action.payload,
		[getStudentInfo.fulfilled]: (state, action) => action.payload
	}
});

export default teacherSlice.reducer;
