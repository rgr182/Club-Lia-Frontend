import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import jwtService from "../../../../services/jwtService";

// export const getGroup = createAsyncThunk('groupsApp/singlegroup/getGroup', async (params) => {

// 	const response = await axios.get(process.env.REACT_APP_API + '/grupos/' + params.id);

// 	const data = await response.data;
// 	return data;

// });

export const registerParent = (registerData) => async dispatch => {
	return jwtService
		.addSubscriptionMembership({
			subscription: registerData.subscription,
			childrens: registerData.children,
		})
		.then(register => {
			console.log(register);
			dispatch(registerSuccess(register));
			dispatch(registerReset());
		})
		.catch(error => {
			console.log(error);
			return dispatch(registerError(error));
		});
};
export const registerTeacherCourse = (registerData) => async dispatch => {
	return jwtService
		.addCourseTeacher({
			name: registerData.name,
			last_name: registerData.last_name,
			email: registerData.email,
			phone_number: registerData.phone_number,
			country: registerData.country,
			state: registerData.state,
			username: registerData.username,
			role_id: registerData.role_id,
			password: registerData.password,
			c_password: registerData.password,
			course: {
				id: registerData.course.productable_id,
				price: registerData.course.price,
				name: registerData.course.name,
			}
		})
		.then(register => {
			console.log(register);
			dispatch(registerSuccess(register));
			dispatch(registerReset());
		})
		.catch(error => {
			console.log(error);
			return dispatch(registerError(error));
		});
};

export const registerSupport = ( registerData, file ) => async dispatch => {
	return jwtService
		.addSupportMembership({
			support: registerData.support,
			institution: registerData.institution,
			businessName: registerData.businessName,
			position: registerData.position,
			name: registerData.name,
			email: registerData.email,
			phone_number: registerData.phone_number,
			instructions: registerData.instructions,
			country: registerData.country,
			state: registerData.state,
			supportStudents: registerData.supportStudents,
			supportAmount: registerData.supportAmount,
			publish_donors: registerData.publish_donors,
			publish_logo: registerData.publish_logo,
			publish_both: registerData.publish_both,
			file: file

		})
		.then(register => {
			console.log(register);
			dispatch(registerSuccess(register));
			dispatch(registerReset());
		})
		.catch(error => {
			console.log(error);
			return dispatch(registerError(error));
		});
};

export const registerSponsorship = (registerData, file) => async dispatch => {
	return jwtService
		.addSponsorship({
			sponsorship: registerData.sponsorship,
			institution: registerData.institution,
			businessName: registerData.businessName,
			position: registerData.position,
			name: registerData.name,
			email: registerData.email,
			phone_number: registerData.phone_number,
			country: registerData.country,
			state: registerData.state,
			supportStudents: registerData.supportStudents,
			supportAmount: registerData.supportAmount,
			supportMonths: registerData.supportMonths,
			publish_donors: registerData.publish_donors,
			publish_logo: registerData.publish_logo,
			publish_both: registerData.publish_both,
			file: file

		})
		.then(register => {
			console.log(register);
			dispatch(registerSuccess(register));
			dispatch(registerReset());
		})
		.catch(error => {
			console.log(error);
			return dispatch(registerError(error));
		});
};

const registerAdapter = createEntityAdapter({});


const registerSlice = createSlice({
	name: 'pricingApp/register',
	initialState: registerAdapter.getInitialState({
		register: {
			success: false,
			response: false,
			error: null
		}
	}),
	reducers: {
		registerSuccess: (state, action) => {
			state.register = {
				success: true,
				response: action.payload
			}

		},
		registerError: (state, action) => {
			state.register = {
				success: false,
				error: action.payload
			}
		},
		registerReset: (state, action) => {
			state.register = {
				success: false,
				error: null,
			};
		},

	},
	extraReducers: {
		// [getMemberships.fulfilled]: (state, action) => {
		// 	const { data, routeParams } = action.payload;
		// 	pricingAdapter.setAll(state, data);
		// 	state.routeParams = routeParams;
		// }
	}
});

export const {
	registerSuccess,
	registerError,
	registerReset
} = registerSlice.actions;

export default registerSlice.reducer;