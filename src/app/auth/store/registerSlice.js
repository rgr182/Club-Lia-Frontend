import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { createUserSettingsFirebase, setUserData } from './userSlice';

export const submitRegister = ({ displayName, password, email, username }) => async dispatch => {
	return jwtService
		.createUser({
			name: displayName,
			password: password,
			username: username,
			email: email,
			c_password: password,
		})
		.then(user => {
			dispatch(setUserData(user));
			return dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const submitRegisterParentTeacher = ({ name, lastName, password, email, username, phone, state, role_id, level, unit_price, id_licenses_type }) => async dispatch => {
	return jwtService
		.userSubscription({
			name: name,
			last_name: lastName,
			password: password,
			username: username,
			email: email,
			phone_number: phone,
			country:"México",
			state: state,
			city: state,
			school_id: 305,
			role_id: role_id,
			level: level,
			unit_price: unit_price,
			id_licenses_type: id_licenses_type
		})
		.then(user => {
			localStorage.setItem('id_parent', user.data.lia.id);
			localStorage.setItem('id_order', user.data.order);
			return dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const storeOrder = ({id_licenses_type}) => async dispatch => {
	return jwtService
		.storeOrder({
			id_licenses_type: id_licenses_type
		}).then(response => {
			localStorage.setItem('id_order', response.data.order.id);
			window.location.href = response.data.payment.init_point;
			return dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error));
		})
};

export const submitRegisterChild = ({ name, lastName, password, email, username, tutor_id, level }) => async dispatch => {
	return jwtService
		.studentSubscription([{
			name: name,
			last_name: lastName,
			password: password,
			username: username,
			email: email,
			tutor_id: tutor_id,
			school_id: 305,
			level: level
		}])
		.then(user => {
			return dispatch(registerChildrenSuccess());
		})
		.catch(error => {
			return dispatch(registerChildrenError(error));
		});
};

export const submitRegisterSchool = ({ name, email, phone, country, city, message, membership }) => async dispatch => {
	return jwtService
		.schoolSubscription({
			name: name,
			email: email,
			phone: phone,
			country: country,
			city: city,
			message: message,
			membership: membership
		})
		.then(user => {
			return dispatch(registerSchoolSuccess());
		})
		.catch(error => {
			return dispatch(registerSchoolError(error));
		});
};

export const membershipPayment = ({ name, lastName, email, phone, title, description, unit_price, id_licenses_type, quantity}) => async dispatch => {
	return jwtService
		.handlePayment({
			payer:{
				name: name,
				surname: lastName,
				email: email,
				phone: phone
			},
			item:{
				title: title,
				description: description,
				unit_price: unit_price
			},
			id_licenses_type: id_licenses_type,
			quantity: quantity

		}).then(response => {
			window.location.href = response.init_point;
			// dispatch()
			return 1;
		})
		.catch(error => {
			return null;
		})
};

export const registerWithFirebase = model => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}
	const { email, password, displayName } = model;

	return firebaseService.auth
		.createUserWithEmailAndPassword(email, password)
		.then(response => {
			dispatch(
				createUserSettingsFirebase({
					...response.user,
					displayName,
					email
				})
			);

			return dispatch(registerSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = ['auth/operation-not-allowed', 'auth/user-not-found', 'auth/user-disabled'];

			const emailErrorCodes = ['auth/email-already-in-use', 'auth/invalid-email'];

			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = {
				email: emailErrorCodes.includes(error.code) ? error.message : null,
				displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}

			return dispatch(registerError(response));
		});
};

const initialState = {
	success: false,
	successChild: false,
	successSchool: false,
	error: {
		username: null,
		password: null,
		response: null
	},
	errorChild: {
		username: null,
		password: null,
		response: null
	},
	errorSchool: {
		username: null,
		password: null,
		response: null
	}
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
		},
		registerChildrenSuccess: (state, action) => {
			state.successChild = true;
		},
		registerNewChildren: (state, action) => {
			state.successChild = false;
		},
		registerSchoolSuccess: (state, action) => {
			state.successSchool = true;
		},
		registerError: (state, action) => {
			state.success = false;
			state.error = {
				success: false,
				response: action.payload
			};
		},
		registerChildrenError: (state, action) => {
			state.successChild = false;
			state.errorChild = {
				success: false,
				response: action.payload
			};
		},
		registerSchoolError: (state, action) => {
			state.successSchool = false;
			state.errorSchool = {
				success: false,
				response: action.payload
			};
		}
	},
	extraReducers: {}
});

export const { registerSuccess, registerChildrenSuccess, registerNewChildren, registerSchoolSuccess, registerError, registerChildrenError, registerSchoolError } = registerSlice.actions;

export default registerSlice.reducer;
