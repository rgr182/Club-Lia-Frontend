import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { showMessage } from 'app/store/fuse/messageSlice';

export const getProfile = createAsyncThunk('ProfileApp/profile/getProfile', async (user_id) => {
	try {
		const response = await axios.get(process.env.REACT_APP_API + '/profile', {
			params: user_id ? { user_id: user_id } : {}
		});
		const data = await response.data;
		return data;
	} catch (e) {
		console.log(e);
	}
});

export const statusprofileUpdate = createAsyncThunk('ProfileApp/profile/statusprofileUpdate', async ({ dataForm }, { dispatch }) => {
	const data = {
		id: dataForm.id,
		status: dataForm.status,
		comments: dataForm.comments
	}
	await axios.post(process.env.REACT_APP_API + '/statusprofileUpdate', data).then(response => {
		if (response.status == 200) {
			dispatch(registerSuccess());
			dispatch(getProfile(dataForm.id));
			dispatch(registerReset());
		} else {
			dispatch(registerError('Ocurrió un error!'));
		}
	}).catch(error => {
		dispatch(registerError(error));
	});
});

export const profileUpdate = createAsyncThunk('ProfileApp/profile/profileUpdate', async ({ data }, { dispatch }) => {

	var formData = new FormData();
	formData.append('name', data.name);
	formData.append('last_name', data.last_name);
	formData.append('level_id', data.level_id);
	formData.append('email', data.email);

	formData.append('country', data.country);
	formData.append('state', data.state);
	formData.append('city', data.city);
	formData.append('phone_number', data.phone_number);

	formData.append('school_name', data.school_name);
	formData.append('intereses', data.subjects); 
	formData.append('level_school', data.level_school);

	formData.append('document_type', data.document_type);
	formData.append('grade', data.grade);

	Array.isArray(data.toDeleteFiles) &&
		data.toDeleteFiles.forEach(fileName => {
			formData.append('toDeleteFiles[]', fileName);
		});

	Array.isArray(data.files) &&
		data.files.forEach(file => {
			formData.append('files[]', file);
		})

	await axios.post(process.env.REACT_APP_API + '/profileUpdate', formData,
		{
			headers: {
				'x-amz-acl': 'public-read',
				'Content-Type': 'multipart/form-data',
			}
		},
	).then(response => {
		if (response.status == 200) {
			dispatch(registerSuccess());
			dispatch(getProfile());
			dispatch(registerReset());
		} else {
			dispatch(registerError('Ocurrió un error!'));
		}
	}).catch(error => {
		dispatch(registerError(error));
	});
});

export const removeContact = createAsyncThunk('ProfileApp/profile/removeContact', async (uuid, { dispatch, getState }) => {
	try {
		await axios.delete(process.env.REACT_APP_API + '/usuarios/' + uuid).then(response => {
			const data = response.data.data;
			dispatch(showMessage({ message: response.data.data.message, variant: 'success' }));
			// dispatch(getContacts());
			// dispatch(getParentsData());
			return data;
		}).catch(error => {
			dispatch(showMessage({ message: 'Ocurrió un error!', variant: 'error' }));
		});
	} catch (error) {
		dispatch(showMessage({ message: 'Ocurrió un error!', variant: 'error' }));
	}
}
);

const profileAdapter = createEntityAdapter({});

const profileSlice = createSlice({
	name: 'ProfileApp/profile',
	initialState: profileAdapter.getInitialState({
		enableEdit: false,
		profileData: null,
		fileDialog: {
			props: {
				open: false
			},
			data: null
		},
		profileStatus: {
			success: false,
			response: false,
			error: null
		},
	}),
	reducers: {
		setEnableEdit: (state, action) => {
			state.enableEdit = action.payload;
		},
		openFileDialog: (state, action) => {
			state.fileDialog = {
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeFileDialog: (state, action) => {
			state.fileDialog = {
				props: {
					open: false
				},
				data: null
			};
		},
		registerSuccess: (state, action) => {
			state.profileStatus = {
				success: true,
				response: action.payload,
			};
		},
		registerError: (state, action) => {
			state.profileStatus = {
				success: false,
				error: action.payload,
			};
		},
		registerReset: (state, action) => {
			state.profileStatus = {
				success: false,
				error: null,
			};
		},
	},
	extraReducers: {
		[getProfile.fulfilled]: (state, action) => {
			if (action.payload) {
				const { data } = action.payload;
				state.profileData = data;
			}
		},
	}
});

export const {
	setEnableEdit,
	openFileDialog,
	closeFileDialog,
	registerSuccess,
	registerError,
	registerReset
} = profileSlice.actions;

export default profileSlice.reducer;
