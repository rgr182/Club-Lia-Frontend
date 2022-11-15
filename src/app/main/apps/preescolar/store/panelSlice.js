import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getPanelInfo = createAsyncThunk('PreescolarApp/score/panelInfo', async () => {
	const today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + today.getMinutes();
	let params = {
		today: date,
	};
	
	const response = await axios.get(process.env.REACT_APP_API+'/dashboard/panel',{
		params: params
	});
	const data = await response.data;
	return data;
});

const panelSlice = createSlice({
	name: 'PreescolarApp/score',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getPanelInfo.fulfilled]: (state, action) => action.payload
	}
});

export default panelSlice.reducer;


