import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';


export const getResources = createAsyncThunk('aulaApp/resources/getResources', async () => {
    // let filterResource = getState().ResourcesApp.filter.resources;
    const response = await axios.get(process.env.REACT_APP_API + '/resources', {
        // params: filterResource
    });
    const data = await response.data;
    return data;
});

const resourcesAdapter = createEntityAdapter({});

const resourceSlice = createSlice({
	name: 'aulaApp/aula',
	initialState: resourcesAdapter.getInitialState({
        loading: false,
        resourceDialog : {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
	}),
	reducers: {
		openResourceDialog: (state, action) => {
            state.resourceDialog = {
                props: {
                    open: true
                },
                data: null
            };
        },
        closeResourceDialog: (state, action) => {
            state.resourceDialog = {
                props: {
                    open: false
                },
                data: null
            };
        },
	},
	extraReducers: {
        [getResources.fulfilled]: (state, action) => {
            const { data } = action.payload;
            state.data = data;
        },
	}
});

export const {
    openResourceDialog,
	closeResourceDialog
} = resourceSlice.actions;

export default resourceSlice.reducer;