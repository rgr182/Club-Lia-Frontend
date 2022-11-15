import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { showMessage } from 'app/store/fuse/messageSlice';
import {getContacts} from "./contactsSlice";
import {getParentsData} from "./parentsSlice";

export const getUserData = createAsyncThunk('contactsApp/user/getUserData', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/usuarios');
	const data = await response.data;
	return data;
});

export const submitCreateContact = ( userdata ) => async dispatch => {
	return jwtService
		.addContact({
			username: userdata.username,
			name: userdata.name,
			last_name: userdata.last_name,
			school_id: userdata.school_id,
			role_id: userdata.role_id,
			email: userdata.email,
			grade: userdata.grade,
			password: userdata.password,
			childrens_id: userdata.childrens_id,
			tutor_id: userdata.tutor_id ? userdata.tutor_id.value : null
		})
		.then(user => {
			dispatch(registerSuccess());
			dispatch(getContacts());
			dispatch(registerReset());
			dispatch(getParentsData());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};
export const submitUpdateContact = ( userdata, userdataOri ) => async dispatch => {
	return jwtService
		.updateContact({
			uuid:userdataOri.uuid,
			name: userdata.name,
			last_name: userdata.last_name,
			school_id: userdata.school_id,
			role_id: userdata.role_id,
			email: userdata.email,
			grade: userdata.grade,
			password: userdata.password,
			childrens_id: userdata.childrens_id,
			tutor_id: userdata.tutor_id ? userdata.tutor_id.value : null
		})
		.then(user => {
			dispatch(registerSuccess());
			dispatch(getContacts());
			dispatch(registerReset());
			dispatch(getParentsData());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});

};

export const submitUpdateContactGroup = ( userdata, users ) => async dispatch => {
	return jwtService
		.updateContactGroup({
			users: users,
			school_id: userdata.school_id,
			role_id: userdata.role_id,
			grade: userdata.grade,
			password: userdata.password
		})
		.then(user => {
			dispatch(registerSuccess());
			dispatch(getContacts());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};
export const submitAddContactToGroup = ( group, users ) => async dispatch => {
	return jwtService
		.addContactToGroup({
			groupId: group.groupList,
			uuids: users,
		})
		.then(user => {
			console.log(user);
			dispatch(registerSuccess());
			// dispatch(getContacts());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};
const initialState = {
	success: false,
	response: false,
	error: {
		errors: {
			username: null,
			password: null,
			email: null,
			name: null,
			last_name: null,
			grado: null,
		}
	}
};
const userSlice = createSlice({
	name: 'contactsApp/user',
	initialState,
	reducers: {registerSuccess: (state, action) => {
			state.success = true;
			state.response = action.payload;
		},
		registerError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		},
		registerReset: (state, action) => {
			state.success = false;
			state.error = null;
		}},
	extraReducers: {}
});

export const { registerSuccess, registerError, registerReset } = userSlice.actions;


export default userSlice.reducer;
