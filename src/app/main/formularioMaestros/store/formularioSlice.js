import jwtService from "../../../services/jwtService/jwtService";
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

export const fileCreateForm = (file, id) => async dispatch => {
	return jwtService
		.addFiles({
            id: id ? id: '',
			files: file && file.length > 0 && file != '' ? file : null,
		})
		.then(activity => {
			dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

const formularioAdapter = createEntityAdapter({});

const formularioSlice = createSlice({
	name: 'formulario/files',
	initialState: formularioAdapter.getInitialState({
		loading: false,
		searchText: '',
		routeParams: {},
		homeworkDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		homework: {
			success: false,
			response: false,
			error: null
		}
	}),
	reducers: {
		setLoading: (state, action) => {
            state.loading = action.payload;
        },
		setHomeworksSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		registerSuccess: (state, action) => {
			state.homework = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.homework = {
				success: false,
				error: action.payload,
			};	
		},
		registerReset: (state, action) => {
			state.homework = {
				success: false,
				error: null,
			};	
		},
	}
});

export const {
	setLoading,
	setUserName,
	setHomeworksSearchText,
	openNewHomeworkDialog,
	closeNewHomeworkDialog,
	registerSuccess,
	registerError,
	registerReset,
	openEditHomeworkDialog,
	closeEditHomeworkDialog
} = formularioSlice.actions;


export default formularioSlice.reducer;