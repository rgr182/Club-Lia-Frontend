import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';



export const getAlumnosInfo = createAsyncThunk('DashboardMaestrosApp/alumnos/getAlumnosInfo', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/dashboard/info',{
	});
	const data = await response.data;

	return data;
});

const alumnosSlice = createSlice({
	name: 'DashboardMaestrosApp/alumnos',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getAlumnosInfo.fulfilled]: (state, action) => action.payload,		
	}
});

export default alumnosSlice.reducer;