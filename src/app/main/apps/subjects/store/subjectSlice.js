import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getSubjects = createAsyncThunk('subjectsApp/subjects/getSubjects', async (params, {dispatch}) => {
	dispatch(setLoading(true));
	const response = await axios.get(process.env.REACT_APP_API+'/materias/grupo/'+params.id,{ });
	const data = response.data;
	dispatch(setLoading(false));
	return data;
});

export const getGroups = createAsyncThunk('subjectsApp/groups/getGroups', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/grupos');
	const data = await response.data;
	return data;
});

export const getSubjectsList = createAsyncThunk('subjectsApp/subjects/getSubjectsList', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/materias');
	const data = await response.data;
	return data;
});

export const submitCreateSubject = ( subjectData, group ) => async dispatch => {
	return jwtService
		.addCustomSubject({
			custom_name: subjectData.custom_name,
			subject_id: subjectData.subject_id,
			group_id: subjectData.group_id
		})
		.then(subject => {
			console.log(subject);
			dispatch(registerSuccess());
			dispatch(getSubjects(group));
			dispatch(registerReset());
		})
		.catch(error => {
			console.log(error);
			return dispatch(registerError(error));
		});
};

export const submitUpdateSubject = ( subjectData, subjectOrigin, group ) => async dispatch => {
	return jwtService
		.updateCustomSubject({
			id: subjectOrigin.id,
			custom_name: subjectData.custom_name,
			subject_id: subjectData.subject_id,
			group_id: subjectData.group_id ? subjectData.group_id : subjectOrigin.group_id
		})
		.then(subject => {
			dispatch(registerSuccess());
			dispatch(getSubjects(group));
			dispatch(registerReset());
		})
		.catch(error => {
			console.log(error);
			return dispatch(registerError(error));
		});
};

export const removeSubject = createAsyncThunk('subjectsApp/subjects/removeSubject', async (params, { dispatch, getState }) => {
	try {
		await axios.delete(process.env.REACT_APP_API+'/materias/'+params.id).then(response => {
			const data = response.data.data;
			dispatch(showMessage({message: 'Materia eliminada', variant: 'success'}));
			dispatch(getSubjects(params.group));
			return data;
		}).catch(error => {
			dispatch(showMessage({message: error.response.data.error.message, variant: 'error'}));
		});
	}catch (e){
		console.log(e);
	}
}
);

const subjectsAdapter = createEntityAdapter({});

export const { selectAll: selectSubjects, selectById: selectSubjectsById } = subjectsAdapter.getSelectors(
	state => state.SubjectsApp.subject
);
const subjectSlice = createSlice({
	name: 'subjectsApp/subjects',
	initialState: subjectsAdapter.getInitialState({
		loading: true,
		searchText: '',
		routeParams: {},
		subjectDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		subject: {
			success: false,
			response: false,
			error: null
		},
		groups: {
			message: false,
			status: false,
			data: []
		},
		subjectList: {
			message: false,
			status: false,
			data: []
		},
	}),
	reducers: {
		setLoading: (state, action) => {
            state.loading = action.payload;
        },
		setSubjectsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewSubjectDialog: (state, action) => {
			state.subjectDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewSubjectDialog: (state, action) => {
			state.subjectDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditSubjectDialog: (state, action) => {
			state.subjectDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditSubjectDialog: (state, action) => {
			state.subjectDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		registerSuccess: (state, action) => {
			state.subject = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.subject = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.subject = {
				success: false,
				error: null,
			};	
		},
	},
	extraReducers: {
		[getSubjectsList.fulfilled]: (state, action) => { state.subjectList = action.payload },
		[getGroups.fulfilled]: (state, action) => { state.groups = action.payload },
		[getSubjects.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			subjectsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
	}
});

export const {
	setLoading,
	setSubjectsSearchText,
	openNewSubjectDialog,
	closeNewSubjectDialog,
	registerSuccess,
	registerError,
	registerReset,
	openEditSubjectDialog,
	closeEditSubjectDialog,
} = subjectSlice.actions;


export default subjectSlice.reducer;