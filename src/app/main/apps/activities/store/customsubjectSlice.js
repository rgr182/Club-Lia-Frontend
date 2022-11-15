import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getCustomSubjects = createAsyncThunk('activitiesApp/subjects/getCustomSubjects', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/actividades/materias',{
	});
	const data = await response.data;
	return data;
});

const customsubjectSlice = createSlice({
	name: 'activitiesApp/subjects',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getCustomSubjects.fulfilled]: (state, action) => action.payload
	}
});

export default customsubjectSlice.reducer;
