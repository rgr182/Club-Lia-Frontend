import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getNonPlannedResources = createAsyncThunk(
	'aulaApp/npResources/getNonPlannedResources',
	async (params, { dispatch }) => {
		const values = {
			calendar_id: params.calendar,
			meeting_id: params.id
		};
		const response = await axios.get(`${process.env.REACT_APP_API}/aulaVirtual/getNonPlannedResources`, {
			params: values
		});
		const data = await response.data;
		return data;
	}
);

export const addResource = createAsyncThunk(
	'aulaApp/npResources/addResource',
	async (values, { dispatch, getState }) => {
		try {
			await axios
				.post(`${process.env.REACT_APP_API}/aulaVirtual/addNonPlannedResources`, {
					calendar_id: values.calendar_id,
					meeting_id: values.meeting_id,
					resource_id: values.resource_id
				})
				.then(response => {
					const { data } = response.data;
					dispatch(registerSuccess());
					dispatch(showMessage({ message: response.data.message, variant: 'success' }));
					dispatch(registerReset());
					return data;
				})
				.catch(error => {
					dispatch(registerError(error));
					dispatch(showMessage({ message: error.response.data.error.message, variant: 'error' }));
				});
		} catch (e) {
			console.log(e);
		}
	}
);

export const removeResources = createAsyncThunk(
	'aulaApp/npResources/removeResources',
	async (resources, { dispatch, getState }) => {
		const ids = [];
		for (let i = 0; i < resources.length; i++) {
			ids.push(resources[i].id);
		}
		// console.log(ids);
		try {
			await axios
				.post(`${process.env.REACT_APP_API}/aulaVirtual/removenpResources`, ids)
				.then(response => {
					const { data } = response.data;
					return data;
				})
				.catch(error => {
					dispatch(showMessage({ message: 'Error al eliminar recursos.', variant: 'error' }));
				});
		} catch (e) {
			// dispatch(setLoadingDeleteFalse());
		}
	}
);

const npresourcesAdapter = createEntityAdapter({});

const nonPlannedResourcesSlice = createSlice({
	name: 'ResourcesIconsApp/npResources',
	initialState: npresourcesAdapter.getInitialState({
		npresource: {
			success: false,
			response: false,
			error: null
		},
		validURL: {
			valid: false,
			url: ''
		}
	}),
	reducers: {
		registerSuccess: (state, action) => {
			state.npresource = {
				success: true,
				response: action.payload
			};
		},
		registerError: (state, action) => {
			state.npresource = {
				success: false,
				error: action.payload
			};
		},
		registerReset: (state, action) => {
			state.npresource = {
				success: false,
				error: null
			};
		},
		setValidURLTrue: (state, action) => {
			state.validURL = {
				valid: true,
				url: action.payload
			};
		},
		setValidURLFalse: (state, action) => {
			state.validURL = {
				valid: false,
				url: action.payload
			};
		},
		setValidURLReset: (state, action) => {
			state.validURL = {
				valid: false,
				url: ''
			};
		}
	},
	extraReducers: {
		[getNonPlannedResources.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.data = data;
		}
	}
});

export const {
	registerSuccess,
	registerError,
	registerReset,
	setValidURLTrue,
	setValidURLFalse,
	setValidURLReset
} = nonPlannedResourcesSlice.actions;

export default nonPlannedResourcesSlice.reducer;
