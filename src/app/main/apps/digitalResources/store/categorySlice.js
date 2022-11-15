import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategories = createAsyncThunk('ResourcesApp/categories/getCategories', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/resourcesCategories');
	const data = await response.data;
	return data;
});

const categorySlice = createSlice({
	name: 'ResourcesApp/categories',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getCategories.fulfilled]: (state, action) => action.payload
	}
});

export default categorySlice.reducer;
