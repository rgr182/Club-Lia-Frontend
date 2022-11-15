import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from 'app/services/jwtService';

export const getResources = createAsyncThunk(
	'ResourcesApp/resources/getResources',
	async (role, { dispatch, getState }) => {
		dispatch(setLoading(true));
		const filterResource = getState().ResourcesApp.filter.resources;
		const response = await axios.get(`${process.env.REACT_APP_API}/resources`, {
			params: filterResource
		});
		const data = await response.data;
		dispatch(setLoading(false));
		return data;
	}
);

export const submitCreateResource = form => async dispatch => {
	return jwtService
		.createResource({
			bloque: form.bloque,
			description: form.description,
			grade: form.grade,
			id_category: form.id_category,
			id_materia_base: form.id_materia_base,
			level: form.level,
			name: form.name,
			url_resource: form.url_resource
		})
		.then(user => {
			dispatch(registerSuccess());
			dispatch(getResources());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const submitUpdateResource = (form, formOrigin) => async dispatch => {
	return jwtService
		.updateResource({
			id: formOrigin.id,
			bloque: form.bloque,
			description: form.description,
			grade: form.grade,
			id_category: form.id_category,
			id_materia_base: form.id_materia_base,
			level: form.level,
			name: form.name,
			url_resource: form.url_resource
		})
		.then(user => {
			dispatch(registerSuccess());
			dispatch(getResources());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const removeResource = createAsyncThunk(
	'ResourcesApp/resources/updateResource',
	async (formOrigin, { dispatch, getState }) => {
		const response = await axios
			.delete(`${process.env.REACT_APP_API}/resources/${formOrigin}`)
			.then(user => {
				dispatch(registerSuccess());
				dispatch(getResources());
				dispatch(registerReset());
			})
			.catch(error => {
				return dispatch(registerError(error));
			});
		const data = await response.data;
	}
);

const resourcesAdapter = createEntityAdapter({});

export const { selectAll: selectResources, selectById: selectResourceById } = resourcesAdapter.getSelectors(
	state => state.ResourcesApp.resources
);

const resoursesSlice = createSlice({
	name: 'ResourcesApp/resources',
	initialState: resourcesAdapter.getInitialState({
		loading: false,
		resourceDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		resourceDescriptionDialog: {
			props: {
				open: false
			},
			data: null
		},
		resource: {
			success: false,
			response: false,
			error: null
		},
		routeParams: {}
	}),
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setResourcesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewResourceDialog: (state, action) => {
			state.resourceDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewResourceDialog: (state, action) => {
			state.resourceDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditResourceDialog: (state, action) => {
			state.resourceDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditResourceDialog: (state, action) => {
			state.resourceDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openResourceDescriptionDialog: (state, action) => {
			state.resourceDescriptionDialog = {
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeResourceDescriptionDialog: (state, action) => {
			state.resourceDescriptionDialog = {
				props: {
					open: false
				},
				data: null
			};
		},
		registerSuccess: (state, action) => {
			state.resource = {
				success: true,
				response: action.payload
			};
		},
		registerError: (state, action) => {
			state.resource = {
				success: false,
				error: action.payload
				// error: true
			};
		},
		registerReset: (state, action) => {
			state.resource = {
				success: false,
				error: null
			};
		},
		setResourcesFilter: (state, action) => {
			state.resourceDialog = {
				filterResource: action.payload
			};
		}
	},
	extraReducers: {
		[getResources.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			resourcesAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setLoading,
	setResourcesSearchText,
	setResourcesFilter,
	openEditResourceDialog,
	openNewResourceDialog,
	closeNewResourceDialog,
	closeEditResourceDialog,
	openResourceDescriptionDialog,
	closeResourceDescriptionDialog,
	registerSuccess,
	registerError,
	registerReset
} = resoursesSlice.actions;

export default resoursesSlice.reducer;
