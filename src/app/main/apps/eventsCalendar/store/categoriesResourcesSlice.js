import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategoriesResources = createAsyncThunk('ActivitiesApp/categoriesResources/getCategoriesResources', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/resourcesCategories');
	const data = await response.data;
	return data;
});

const categoriesResourcesSlice = createSlice({
	name: 'ActivitiesApp/categoriesResources',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getCategoriesResources.fulfilled]: (state, action) => action.payload
	}
});

export default categoriesResourcesSlice.reducer;
