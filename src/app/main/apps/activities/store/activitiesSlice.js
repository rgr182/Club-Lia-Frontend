import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { showMessage } from 'app/store/fuse/messageSlice';
import { isNull } from 'lodash';

export const getActivities = createAsyncThunk('activitiesApp/activities/getActivities', async ( role, { dispatch, getState }) => {
	dispatch(setLoading(true));
	let filterContacts = getState().ActivitiesApp.filter.activity;

	const today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + today.getMinutes();

	let params = {
		group_id: filterContacts.group_id == 0 ? null : filterContacts.group_id,
		from: filterContacts.from,
		until: filterContacts.until,
		today: date,
		status: filterContacts.status ? filterContacts.status : null,
		customsubjects_id: filterContacts.customsubjects_id == 0 ? null : filterContacts.customsubjects_id,
		active_id: filterContacts.active_id == 3 ? null : filterContacts.active_id,
	};
	
	if (role == 'alumno' || role == 'alumno_secundaria' ||  role == 'preescolar' || role == 'alumnoe0' || role == 'alumnoe1' || role == 'alumnoe2' || role == 'alumnoe3' || role == 'Alumno-I' || role == 'Alumno-M' || role == 'Alumno-A' ) {
		const response = await axios.get(process.env.REACT_APP_API + '/tareas', {
			params: params
		});
		const data = await response.data;
		dispatch(setLoading(false));
		return data;
	}
	else {
		const response = await axios.get(process.env.REACT_APP_API + '/actividades', {
			params: params
		});
		const data = await response.data;
		dispatch(setLoading(false));
		return data;
	}
	
});

export const getSubjects = createAsyncThunk('activitiesApp/subjects/getSubject', async (id) => {
	const response = await axios.get(process.env.REACT_APP_API+'/materias/grupo/'+id,{
	});
	const data = await response.data;
	return data;
});

export const getGroupUsers = createAsyncThunk('activitiesApp/subjects/getGroupUsers', async (id) => {
	const response = await axios.get(process.env.REACT_APP_API+'/groupousuarios/'+id,{
	});
	const data = await response.data;
	return data;
});

export const getGroupHomeworks = createAsyncThunk('activitiesApp/subjects/getGroupHomeworks', async (params) => {

	const response = await axios.get(process.env.REACT_APP_API+'/tareas/grupos',{
		params: {
			group_id: params.group_id,
			user_id: params.user_id,
			from: params.from,
			until: params.until,
		}
	});
	let data = await response.data;

	if (params.downloadType == 'group' && data.data.length > 0) {
		data.data = data.data.reduce(function (r, a, i) {
			if (!i || r[r.length - 1][0]['activity_name'] !== a['activity_name']) {
				return r.concat([[a]]);
			}
			r[r.length - 1].push(a);
			return r;
		}, []);
	} else {
		data.data = [data.data];
	}

	return data;
});

export const submitCreateActivity = ( activityData, file, resources ) => async dispatch => {
	return jwtService
		.addActivity({
	        name: activityData.name,
            groupId: activityData.group_id,
	        finishDate: activityData.finish_date.replace("T", " "),
	        publicDay: activityData.publish_date.replace("T", " "),
			theme: activityData.theme,
			instructions: activityData.instructions,
			is_active: activityData.is_active ? activityData.is_active : 0,
			urlPath: activityData.url_path.length > 0 ? JSON.stringify(activityData.url_path) : '',
			files: file,
			subject_id: activityData.subject_id,
			resources: resources
		})
		.then(activity => {
			dispatch(registerSuccess());
			dispatch(getActivities());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const submitUpdateActivity = ( activityData, activityDataOrigin, file, resources, toDeleteFiles ) => async dispatch => {
	return jwtService
		.updateActivity({
            activityId:activityDataOrigin.id,
			name: activityData.name,
            groupId: activityData.group_id ? activityData.group_id : activityDataOrigin.group_id,
	        finishDate: activityData.finish_date.replace("T", " "),
			publicDay: activityData.publish_date ? activityData.publish_date.replace("T", " ") : '',
			theme: activityData.theme,
			instructions: activityData.instructions,
			is_active: activityData.is_active ? activityData.is_active : 0,
			filePath: '',
			urlPath: activityData.url_path.length > 0 ? JSON.stringify(activityData.url_path) : '',
			files: file && file.length > 0 && file != '' ? file : null,
			subject_id: activityData.subject_id ? activityData.subject_id : activityDataOrigin.subject_id,
			resources: resources,
			toDeleteFiles: toDeleteFiles && toDeleteFiles.length > 0 ? toDeleteFiles : null,
		})
		.then(activity => {
			dispatch(registerSuccess());
			dispatch(getActivities());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});

};

export const removeActivity = createAsyncThunk(
	'activitiesApp/activities/removeActivity',
	async (id, { dispatch, getState }) => {
		try {
			await axios.delete(process.env.REACT_APP_API+'/actividades/'+id).then(response => {
				const data = response.data;
				dispatch(showMessage({message: response.data.message, variant: 'success'}));
				dispatch(getActivities());
				return data;
			}).catch(error => {
				dispatch(showMessage({message: error.response.data.message, variant: 'error'}));
			});
		}catch (e){
			console.log(e);
		}
	}
);

export const removeFile = (name, file) => async dispatch => {
	try {
		await axios.delete(process.env.REACT_APP_API+'/remove-file/'+name+'/'+file).then(response => {
			const data = response.data;
			dispatch(showMessage({message: response.data.message, variant: 'success'}));
			dispatch(getActivities());
			return data;
		}).catch(error => {
			dispatch(showMessage({message: error.response.data.message, variant: 'error'}));
		});
	}catch (e){
		console.log(e);
	}
};

export const duplicateActivity = (id) => async dispatch => {
	try {
		return await axios.get(process.env.REACT_APP_API+'/activity/duplicate/'+ id).then(response => {
			const data = response.data;
			return data;
		}).catch(error => {
			return error;
		});
	}catch (e){
		console.log(e);
	}
};

export const downloadActivity = ( filename ) => async dispatch => {
	
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
		link.setAttribute('download', filename.slice(filename.indexOf('_')+1 )); //or any other extension
		document.body.appendChild(link);
		link.click();
	}).catch(error => {
		dispatch(showMessage({message: "Error al descargar el archivo", variant: 'error'}));
	})
};

const activitiesAdapter = createEntityAdapter({});

export const { selectAll: selectActivities, selectById: selectActivityById } = activitiesAdapter.getSelectors(
	state => state.ActivitiesApp.activities
);

const activitiesSlice = createSlice({
	name: 'activitiesApp/activities',
    initialState: activitiesAdapter.getInitialState({
		loading: false,
        activityDialog : {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
        downloadDialog : {
            props: {
                open: false
            }
        },
        activity: {
			success: false,
			response: false,
			error: null
		},
		routeParams: {},
		subjects: {
			data: []
		},
		groupUsers: {
			data: []
		},
		groupHomeworks: {
			data: []
		},
    }),
    reducers: {
		setLoading: (state, action) => {
            state.loading = action.payload;
        },
        openNewActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'new',
                props: {
                    open: true
                },
                data: null
            };
        },
        closeNewActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'new',
                props: {
                    open: false
                },
                data: null
            };
        },
		openEditActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'edit',
                props: {
                    open: true
                },
                data: action.payload
            };
        },
        closeEditActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'edit',
                props: {
                    open: false
                },
                data: null
            };
        },
		openDownloadDialog: (state, action) => {
            state.downloadDialog = {
                props: {
                    open: true
                }
            };
        },
        closeDownloadDialog: (state, action) => {
            state.downloadDialog = {
                props: {
                    open: false
                }
            };
        },
        registerSuccess: (state, action) => {
			state.activity = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.activity = {
				success: false,
				error: action.payload,
			};	
		},
		registerReset: (state, action) => {
			state.activity = {
				success: false,
				error: null,
			};	
		},
    },
	extraReducers: {
		[getSubjects.fulfilled]: (state, action) => {state.subjects = action.payload},
		[getGroupUsers.fulfilled]: (state, action) => {state.groupUsers = action.payload},
		[getGroupHomeworks.fulfilled]: (state, action) => {state.groupHomeworks = action.payload},
        [getActivities.fulfilled]: (state, action) => {
            const { data, routeParams } = action.payload;
			activitiesAdapter.setAll(state, data);
			state.routeParams = routeParams;
        }
    }
});

export const {
	setLoading,
	openNewActivityDialog,
    closeNewActivityDialog,
	openEditActivityDialog,
	closeEditActivityDialog,
	openDownloadDialog,
	closeDownloadDialog,
    registerError,
    registerSuccess,
    registerReset,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
