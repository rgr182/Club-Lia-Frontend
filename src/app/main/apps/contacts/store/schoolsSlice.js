import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSchoolsData = createAsyncThunk('schoolsApp/schools/getSchoolsData', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/schools');
	const data = await response.data;
	return data;
});

const schoolsSlice = createSlice({
	name: 'schoolsApp/school',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getSchoolsData.fulfilled]: (state, action) => action.payload
	}
});

export default schoolsSlice.reducer;
