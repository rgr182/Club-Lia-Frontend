import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { getDelivered } from 'app/store/fuse/avatarSlice';
import clsx from 'clsx';

export const getHomeworks = createAsyncThunk('homeworksApp/homeworks/getHomeworks', async (params, {dispatch}) => {
	dispatch(setLoading(true));
	const response = await axios.get(process.env.REACT_APP_API+'/tareas/actividad/'+params.id,{ });
	const data = await response.data;
	dispatch(setLoading(false));
	return data;
});

export const getHomeworksAll = createAsyncThunk('homeworksApp/homeworks/getHomeworksAll', async (params, {dispatch}) => {
	const response = await axios.get(process.env.REACT_APP_API + '/actividades');
	const data = await response.data;
	return data;
});

export const submitCreateHomework = ( homeworkdata ) => async dispatch => {
	return jwtService
		.addHomework({
			homeworkName: homeworkdata.name,
			teacherId: homeworkdata.teacher.id,
			schoolId: homeworkdata.teacher.school_id,
			grade: homeworkdata.grade,
		})
		.then(homework => {
			dispatch(registerSuccess());
			dispatch(getHomeworks());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const submitUpdateHomework = ( homeworkdata, homeworkOrigin ) => async dispatch => {

	const today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + ('0'+( today.getMinutes() + 1)).slice(-2);

	return jwtService
		.updateHomework({
			id: homeworkOrigin.id,
			status: 'Calificado',
			score: homeworkdata.score,
			scoredDate: date,
		})
		.then(response => {
			dispatch(registerSuccess());
			dispatch(getHomeworks({ 'id': response.data.activity_id}));
			dispatch(registerReset());
			dispatch(getDelivered());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};
export const removeHomework = createAsyncThunk('homeworksApp/homeworks/removeHomework', async (id, { dispatch, getState }) => {
		try {
			await axios.delete(process.env.REACT_APP_API+'/grupos/'+id).then(response => {
				const data = response.data.data;
				dispatch(showMessage({message: response.data.message, variant: 'success'}));
				dispatch(getHomeworks());
				return data;
			}).catch(error => {
				dispatch(showMessage({message: error.response.data.error.message, variant: 'error'}));
			});
		}catch (e){
			console.log(e);
		}
	}
);

export const downloadHomework = ( filename ) => async dispatch => {
	axios({
		url: process.env.REACT_APP_API+'/download-file',
		method: 'POST',
		responseType: 'blob', // important
		data: {
			filename:filename
		}
	})
	.then( response => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', filename.slice(filename.indexOf('_')+1)); //or any other extension
		document.body.appendChild(link);
		link.click();
	}).catch(error => {
		dispatch(showMessage({message: "Error al descargar el archivo", variant: 'error'}));
	})
};

const homeworksAdapter = createEntityAdapter({});

export const { selectAll: selectHomeworks, selectById: selectHomeworksById } = homeworksAdapter.getSelectors(
	state => state.HomeworksApp.homework
);
const homeworkSlice = createSlice({
	name: 'homeworksApp/homeworks',
	initialState: homeworksAdapter.getInitialState({
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
	},
	extraReducers: {
		[getHomeworks.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			homeworksAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const getBadges = (id) => async dispatch => {
	axios({
		url: process.env.REACT_APP_API+'/badges',
		method: 'GET',
		responseType: 'json',
		params: {
			id: id
		}
	}).then(response => {
		console.log(response);
	});
}	

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
} = homeworkSlice.actions;


export default homeworkSlice.reducer;