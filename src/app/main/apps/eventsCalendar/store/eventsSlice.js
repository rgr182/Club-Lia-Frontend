import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { showMessage } from 'app/store/fuse/messageSlice';

export const submitEvent = ( data, date, start, end, week, days, resources ) => async dispatch => {
    return jwtService.addEvent({
            subject_id: data.id,
            description: String(data.description).replace(/\*/g, ''),
            start: start,
            end: end,
            recurrence: week,
            resources: resources
	}).then(event => {
		dispatch(registerSuccess());
        dispatch(registerReset());
	}).catch(error => {
        return dispatch(registerError(error));
    });
};

export const updateEvent = ( data, start, end, resources, calendar_id, event_id ) => async dispatch => {
    const body = {
        subject_id: data.id,
        description: String(data.description).replace(/\*/g, ''),
        start: start,
        end: end,
        resources: resources,
        calendar_id: calendar_id,
        event_id: event_id
    }
    await axios.put(process.env.REACT_APP_API+'/google/calendars/events', body).then(response => {
        dispatch(registerSuccess());
        dispatch(registerReset());
    }).catch(error => {
        return dispatch(registerError(error));
    });
};

export const removeEvent = createAsyncThunk( 'calendarApp/event/removeEvent', async (params, { dispatch } ) => {
	await axios.delete(process.env.REACT_APP_API+'/google/calendars/events', {params: params}).then(response => {
        const data = response.data;
        dispatch(showMessage({message: response.data.message, variant: 'success'}));
        return data;
    }).catch(error => {
        dispatch(showMessage({message: error.response.data.message, variant: 'error'}));
    });
});

const eventAdapter = createEntityAdapter({});

const eventSlice = createSlice({
	name: 'calendarApp/event',
	initialState: eventAdapter.getInitialState({
        eventDialog : {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
        event: {
			success: false,
			response: false,
			error: null
		},
    }),
	reducers: {
        openEventDialog: (state, action) => {
            state.eventDialog = {
                type: 'new',
                props: {
                    open: true
                },
                data: action.payload
            };
        },
        closeEventDialog: (state, action) => {
            state.eventDialog = {
                type: 'new',
                props: {
                    open: false
                },
                data: null
            };
        },
        registerSuccess: (state, action) => {
			state.event = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.event = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.event = {
				success: false,
				error: null,
			};	
		},

    },
	extraReducers: {}
});

export const {
	openEventDialog,
    closeEventDialog,
    registerSuccess,
    registerError,
    registerReset,
} = eventSlice.actions;

export default eventSlice.reducer;