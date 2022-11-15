import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';
// import logFirebaseEvent from 'app/main/firebase/FirebaseEvents';

export const submitLogin = ({ username, password }) => async dispatch => {
	return jwtService
		.signInWithEmailAndPassword(username, password)
		.then(user => {
			dispatch(setUserData(user));
			dispatch(rolCookie(user.data.role));
			// logFirebaseEvent('Access', user);
			return dispatch(loginSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = [
				'auth/email-already-in-use',
				'auth/invalid-email',
				'auth/operation-not-allowed',
				'auth/user-not-found',
				'auth/user-disabled'
			];
			const passwordErrorCodes = ['auth/weak-password', 'INVALID_PASSWORD'];
			const response = {
				username: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};
			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}
			return dispatch(loginError(response));
		});
};

const rolCookie = async (role) => {
	if(['alumno', 'alumno_secundaria', 'preescolar', 'alumnoe0', 'alumnoe1', 'alumnoe2', 'alumnoe3', 'Alumno-I', 'Alumno-M', 'Alumno-A'].includes(role)){
		document.cookie = "role=1"
	}
	if(['maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro','maestroe1', 'maestroe2', 'maestroe3', 'Maestro-I', 'Maestro-M', 'Maestro-A', 'Maestro-I-preescolar', 'Maestro-M-preescolar', 'Maestro-A-preescolar', 'Maestro-I-secundaria', 'Maestro-M-secundaria', 'Maestro-A-secundaria', 'Maestro-R'].includes(role)){
		document.cookie = "role=2"
	}
	if(['padre', 'Padre-I', 'Padre-M', 'Padre-A'].includes(role)){
		document.cookie = "role=3"
	}
	if(['admin', 'admin_escuela','director_escuela', 'Escuela-I', 'Escuela-M', 'Escuela-A'].includes(role)){
		document.cookie = "role=4"
	}
}

export const submitLoginWithFireBase = ({ username, password }) => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");
		return () => false;
	}
	return firebaseService.auth
		.signInWithEmailAndPassword(username, password)
		.then(() => {
			return dispatch(loginSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = [
				'auth/email-already-in-use',
				'auth/invalid-email',
				'auth/operation-not-allowed',
				'auth/user-not-found',
				'auth/user-disabled'
			];
			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = {
				username: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}

			return dispatch(loginError(response));
		});
};

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
