import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import jwtService from '../../../../services/jwtService';

export const getGroups = createAsyncThunk('groupsApp/groups/getGroups', async (event, { dispatch }) => {
	dispatch(setLoading(true));
	const response = await axios.get(`${process.env.REACT_APP_API}/grupos`, {});
	const data = await response.data;
	dispatch(setLoading(false));
	return data;
});

export const getTeacherGroups = createAsyncThunk('groupsApp/groups/getTeacherGroups', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/actividades/grupos',{
	});
	const data = await response.data;
	return data;
});

export const submitCreateGroup = groupdata => async dispatch => {
	return jwtService
		.addGroup({
			groupName: groupdata.name,
			teacherId: groupdata.teacher.id,
			schoolId: groupdata.teacher.school_id,
			grade: groupdata.grade
		})
		.then(group => {
			dispatch(registerSuccess());
			dispatch(getGroups());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const submitUpdateGroup = (groupdata, groupOrigin) => async dispatch => {
	return jwtService
		.updateGroup({
			groupId: groupOrigin.id,
			groupTitle: groupdata.name,
			teacherId: groupdata.teacher_id
		})
		.then(group => {
			dispatch(registerSuccess());
			dispatch(getGroups());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};
export const removeGroup = createAsyncThunk('groupsApp/groups/removeGroup', async (id, { dispatch, getState }) => {
	try {
		await axios
			.delete(`${process.env.REACT_APP_API}/grupos/${id}`)
			.then(response => {
				const { data } = response.data;
				dispatch(showMessage({ message: response.data.message, variant: 'success' }));
				dispatch(getGroups());
				return data;
			})
			.catch(error => {
				dispatch(showMessage({ message: error.response.data.error.message, variant: 'error' }));
			});
	} catch (e) {
		console.log(e);
	}
});

const groupsAdapter = createEntityAdapter({});

export const { selectAll: selectGroups, selectById: selectGroupsById } = groupsAdapter.getSelectors(
	state => state.GroupsApp.group
);
const groupSlice = createSlice({
	name: 'groupsApp/groups',
	initialState: groupsAdapter.getInitialState({
		loading: false,
		searchText: '',
		routeParams: {},
		groupDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		group: {
			success: false,
			response: false,
			error: null
		},
		teacherGroups: ''
	}),
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setGroupsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewGroupDialog: (state, action) => {
			state.groupDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewGroupDialog: (state, action) => {
			state.groupDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditGroupDialog: (state, action) => {
			state.groupDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditGroupDialog: (state, action) => {
			state.groupDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		registerSuccess: (state, action) => {
			state.group = {
				success: true,
				response: action.payload
			};
		},
		registerError: (state, action) => {
			state.group = {
				success: false,
				error: action.payload
			};
		},
		registerReset: (state, action) => {
			state.group = {
				success: false,
				error: null
			};
		}
	},
	extraReducers: {
		[getGroups.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			groupsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		},
		[getTeacherGroups.fulfilled]: (state, action) => {
            const { data } = action.payload;
            state.teacherGroups = action.payload;
        }
	}
});

export const {
	setLoading,
	setGroupsSearchText,
	openNewGroupDialog,
	closeNewGroupDialog,
	registerSuccess,
	registerError,
	registerReset,
	openEditGroupDialog,
	closeEditGroupDialog
} = groupSlice.actions;

export default groupSlice.reducer;
