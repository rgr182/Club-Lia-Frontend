import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getSubjects = createAsyncThunk('activitiesApp/subjects/getSubject', async (id) => {
	const response = await axios.get(process.env.REACT_APP_API+'/materias/grupo/'+id,{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});

const subjectSlice = createSlice({
	name: 'activitiesApp/subjects',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getSubjects.fulfilled]: (state, action) => action.payload
	}
});

export default subjectSlice.reducer;