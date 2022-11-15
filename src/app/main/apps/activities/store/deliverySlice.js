import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";

export const submitUploadFile = ( activityData, activityDataOrigin, file, fileType ) => async dispatch => {
	
	const today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + ('0'+( today.getMinutes() + 1)).slice(-2);

    return jwtService
		.updateDelivery({
            id: activityDataOrigin.id,
			filePath: fileType == 'file' ? activityDataOrigin.file_path ? activityDataOrigin.file_path : '' : '',
			urlPath: fileType == 'url' ? activityData.url_path : '',
			file: fileType == 'file' ? file : null,
			deliveryDate: date,
		})
		.then(delivery => {
			dispatch(registerSuccess());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});

};

const deliveryAdapter = createEntityAdapter({});


const deliverySlice = createSlice({
	name: 'activitiesApp/delivery/',
	initialState: deliveryAdapter.getInitialState({
        deliveryUpdateDialog : {
            type: 'update',
            props: {
                open: false
            },
            data: null
        },
        delivery: {
			success: false,
			response: false,
			error: null
		}
    }),
	reducers: {
        openUpdateDeliveryDialog: (state, action) => {
            state.deliveryUpdateDialog = {
                type: 'new',
                props: {
                    open: true
                },
                data: action.payload
            };
        },
        closeUpdateDeliveryDialog: (state, action) => {
            state.deliveryUpdateDialog = {
                type: 'new',
                props: {
                    open: false
                },
                data: null
            };
        },
        registerSuccess: (state, action) => {
			state.delivery = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.delivery = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.delivery = {
				success: false,
				error: null,
			};	
		},

    },
	extraReducers: {}
});

export const {
	openUpdateDeliveryDialog,
    closeUpdateDeliveryDialog,
    registerSuccess,
    registerError,
    registerReset,
} = deliverySlice.actions;

export default deliverySlice.reducer;


