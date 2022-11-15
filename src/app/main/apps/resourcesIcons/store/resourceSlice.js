import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getResources = createAsyncThunk('ResourcesIconsApp/resources/getResources', async (params) => {

    let values = {
        id: params.id,
		globalSchooling: params.globalSchooling
    };

	const response = await axios.get(process.env.REACT_APP_API+'/resourceSubject',{
        params: values
    });
	const data = await response.data;
	return data;
});

const resourceSlice = createSlice({
	name: 'ResourcesIconsApp/resources',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getResources.fulfilled]: (state, action) => action.payload
	}
});

export default resourceSlice.reducer;