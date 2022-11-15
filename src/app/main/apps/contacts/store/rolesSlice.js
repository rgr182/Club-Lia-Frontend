import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRolesData = createAsyncThunk('schoolsApp/roles/getRolesData', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/roles');
	const data = await response.data;
	return data;
});

const rolesSlice = createSlice({
	name: 'schoolsApp/roles',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getRolesData.fulfilled]: (state, action) => action.payload
	}
});

export default rolesSlice.reducer;
