import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { showMessage } from 'app/store/fuse/messageSlice';

export const getProfileParent = createAsyncThunk('ProfileApp/profile/getprofileParent', async (id) => {
	try {
		const response = await axios.get(process.env.REACT_APP_API + '/profileParent/'+id);
		const data = await response.data;
		return data;
	} catch (e) {
		console.log(e);
	}
});

export const statusParentUpdate = createAsyncThunk('ProfileApp/profileParent/statusParentUpdate', async (dataForm, { dispatch }) => {
	await axios.post(process.env.REACT_APP_API + '/statusParentUpdate', dataForm).then(response => {
		if (response.status == 200) {
			dispatch(registerSuccess());
			dispatch(getProfileParent(dataForm.id));
			dispatch(registerReset());
		} else {
			dispatch(registerError('Ocurrió un error!'));
		}
	}).catch(error => {
		dispatch(registerError(error));
	});
});

export const createParentUser = createAsyncThunk('ProfileApp/profileParent/createParentUser', async (dataForm, { dispatch }) => {
	await axios.post(process.env.REACT_APP_API + '/createParentUser', dataForm).then(response => {
		if (response.status == 200) {
			dispatch(registerSuccess());
			dispatch(getProfileParent(dataForm.id));
			dispatch(registerReset());
		} else {
			dispatch(registerError('Ocurrió un error!'));
		}
	}).catch(error => {
		dispatch(registerError(error));
	});
});

const profileParentAdapter = createEntityAdapter({});

const profileParentSlice = createSlice({
	name: 'ProfileApp/profileParent',
	initialState: profileParentAdapter.getInitialState({
		profileParentData: null,
		successDialog: {
			props: {
				open: false
			},
			data: null
		},
		profileParentStatus: {
			success: false,
			response: false,
			error: null
		},
	}),
	reducers: {
		openSuccessDialog: (state, action) => {
			state.successDialog = {
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeSuccessDialog: (state, action) => {
			state.successDialog = {
				props: {
					open: false
				},
				data: null
			};
		},
		registerSuccess: (state, action) => {
			state.profileParentStatus = {
				success: true,
				response: action.payload,
			};
		},
		registerError: (state, action) => {
			state.profileParentStatus = {
				success: false,
				error: action.payload,
			};
		},
		registerReset: (state, action) => {
			state.profileParentStatus = {
				success: false,
				error: null,
			};
		},
	},
	extraReducers: {
		[getProfileParent.fulfilled]: (state, action) => {
			if (action.payload) {
				const { data } = action.payload;
				state.profileParentData = data;
			}
		},
	}
});

export const {
	openSuccessDialog,
	closeSuccessDialog,
	registerSuccess,
	registerError,
	registerReset
} = profileParentSlice.actions;

export default profileParentSlice.reducer;
