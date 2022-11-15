import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import jwtService from "../../../../../services/jwtService";

export const getGroup = createAsyncThunk('groupsApp/singlegroup/getGroup', async (params) => {

	const response = await axios.get(process.env.REACT_APP_API + '/grupos/' + params.id);

	const data = await response.data;
	return data;

});

export const createSingleGroup = ( groupdata ) => async dispatch => {
	console.log(groupdata);
	return jwtService
		.addGroup({
			groupName: groupdata.groupName,
			teacherId: groupdata.teacherId,
			description: groupdata.description,
			grade: groupdata.grade,
			schoolId: groupdata.schoolId,
			newSubjects: groupdata.newSubjects,
			newStudents: groupdata.newStudents
		})
		.then(group => {
			console.log(group);
			dispatch(registerSuccess());
			dispatch(registerReset());
		})
		.catch(error => {
			console.log(error);
			dispatch(registerError(error));
			dispatch(registerReset());
		});
};

export const updateSingleGroup = ( groupdata, id ) => async dispatch => {
	return jwtService
		.updateGroup({
			groupId: id,
			groupTitle: groupdata.groupName,
			teacherId: groupdata.teacherId,
			description: groupdata.description,
			grade: groupdata.grade,
			newSubjects: groupdata.newSubjects,
			newStudents: groupdata.newStudents,
			deletedSubjects: groupdata.deletedSubjects,
			deletedStudents: groupdata.deletedStudents
		})
		.then(group => {
			dispatch(registerSuccess());
			dispatch(registerReset());
		})
		.catch(error => {
			dispatch(registerError(error));
			dispatch(registerReset());
		});
};

export const removeSingleGroup = createAsyncThunk('groupsApp/singlegroup/removeSingleGroup', async (id, { dispatch, getState }) => {
	try {
		await axios.delete(process.env.REACT_APP_API+'/grupos/'+id).then(response => {
			const data = response.data.data;
			dispatch(removedSuccess());
			dispatch(showMessage({message: response.data.message, variant: 'success'}));
			// dispatch(getGroups());
			return data;
		}).catch(error => {
			dispatch(removedError());
			dispatch(showMessage({message: error.response.data.error.message, variant: 'error'}));
		});
	}catch (e){
		console.log(e);
	}
}
);
 
export const duplicateGroup = ( id ) => async dispatch => {
	try {
		await axios.post(process.env.REACT_APP_API+'/duplicar/grupo/'+id).then(response => {
			const data = response.data.data;
			dispatch(showMessage({message: response.data.message, variant: 'success'}));
			dispatch(duplicatedSucess(response.data.data.id));
			dispatch(duplicatedReset());
			return data;
		}).catch(error => {
			dispatch(duplicatedError());
			dispatch(showMessage({message: error.response.data.message, variant: 'error'}));
		});
	}catch (e){
		console.log(e);
	}
};

const singlegroupAdapter = createEntityAdapter({});

const singleGroupSlice = createSlice({
	name: 'groupsApp/singlegroup',
	initialState: singlegroupAdapter.getInitialState({
        loading: false,
        singleGroupDialog : {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
		enableEditGroup: false,
		removedGroup: {
			success: false,
			response: false,
			error: null
		},
		groupRegister: {
			success: false,
			response: false,
			error: null
		},
		duplicated: {
			success: false,
			response: false,
			error: null
		},
	}),
	reducers: {
		openGroupDialog: (state, action) => {
            state.singleGroupDialog = {
                props: {
                    open: true
                },
                data: null
            };
        },
        closeGroupDialog: (state, action) => {
            state.singleGroupDialog = {
                props: {
                    open: false
                },
                data: null
            };
        },
		setEnableEditGroup: (state, action) => {
            state.enableEditGroup = true;

        },
		resetEnableEditGroup: (state, action) => {
            state.enableEditGroup = false;
        },
		removedSuccess: (state, action) => {
			state.removedGroup = {
				success: true,
				response: action.payload,
			};
		},
		removedError: (state, action) => {
			state.removedGroup = {
				success: false,
				error: action.payload,
			};
		},
		removedReset: (state, action) => {
			state.removedGroup = {
				success: false,
				error: null,
			};
		},
		registerSuccess: (state, action) => {
			state.groupRegister = {
				success: true,
				response: action.payload
			};
		},
		registerError: (state, action) => {
			state.groupRegister = {
				success: false,
				error: action.payload
			};
		},
		registerReset: (state, action) => {
			state.groupRegister = {
				success: false,
				error: null
			};
		},
		duplicatedSucess: (state, action) => {
			state.duplicated = {
				success: true,
				response: action.payload
			};
		},
		duplicatedError: (state, action) => {
			state.duplicated = {
				success: false,
				error: action.payload
			};
		},
		duplicatedReset: (state, action) => {
			state.duplicated = {
				success: false,
				error: null
			};
		},
	},
	extraReducers: {
		[getGroup.fulfilled]: (state, action) => {
            const { data } = action.payload;
            state.data = data;
        },
	}
});

export const {
    openGroupDialog,
	closeGroupDialog,
	setEnableEditGroup,
	resetEnableEditGroup,
	removedSuccess,
	removedError,
	removedReset,
	registerSuccess,
	registerError,
	registerReset,
	duplicatedSucess,
	duplicatedError,
	duplicatedReset
} = singleGroupSlice.actions;

export default singleGroupSlice.reducer; 