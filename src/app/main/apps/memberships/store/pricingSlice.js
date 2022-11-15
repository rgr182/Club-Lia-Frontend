import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService';

export const getMemberships = () => async dispatch => {
	return jwtService
		.getMemberships({
		}).then(response => {
			dispatch(MembsSuccess(response.data));
		})
		.catch(error => {
			dispatch(MembsError());
		})
};

const pricingAdapter = createEntityAdapter({});

export const { selectAll: selectMemberships, selectById: selectMembershipsById } = pricingAdapter.getSelectors(
	state => state.PricingApp.membership
);

const pricingSlice = createSlice({
	name: 'pricingApp/pricing',
	initialState: pricingAdapter.getInitialState({
		RegisterScreen: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		memberships: {
			success: false,
			response: false,
			error: null
		}
	}),
	reducers: {
        RegisterPapas: (state, action) => {
            state.RegisterScreen = {
				type: 'papas',
				props: {
					open: true
				},
				data: null
			};
        },
        RegisterMaestros: (state, action) => {
            state.RegisterScreen = {
				type: 'maestros',
				props: {
					open: true
				},
				data: null
			};
        },
        RegisterEscuelas: (state, action) => {
            state.RegisterScreen = {
				type: 'escuelas',
				props: {
					open: true
				},
				data: null
			};
        },
		MembsSuccess: (state,action) => {
			state.memberships = {
				success: true,
				response: action.payload
			}

		},
		MembsError: (state, action) => {
			state.memberships = {
				success: false,
				error: action.payload
			}
		},
		
	},
	extraReducers: {
		[getMemberships.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			pricingAdapter.setAll(state, data);
			state.routeParams = routeParams;
		}
	}
});

export const {
	RegisterPapas,
	RegisterMaestros,
	RegisterEscuelas,
	MembsSuccess,
	MembsError,
} = pricingSlice.actions;


export default pricingSlice.reducer;