import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGroups = createAsyncThunk('calendarApp/calendars/getGroups', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/aulaVirtual/getGroupStudent',{
	});
	const data = await response.data;
	return data;
});

export const getStudentCalendars = createAsyncThunk('calendarApp/calendars/getStudentCalendars', async (params) => {
    const response = await axios.get(process.env.REACT_APP_API+'/google/calendars/alumno', {
        params: {
			group_id: params
		}
    });
    const data = await response.data;
    return data;
});

export const getStudentSubjects = createAsyncThunk('calendarApp/calendars/getStudentSubjects', async (params) => {
    const response = await axios.get(process.env.REACT_APP_API+'/calendar/student/subjects',{
        params: {
			group_id: params
		}
    });
    const data = response.data;
    return data;
});

const calendarsAdapter = createEntityAdapter({});

export const {
    selectAll: selectCalendars
} = calendarsAdapter.getSelectors(state => state.subjectCalendar.alumno);

const subjectCalendaSlice = createSlice({
    name: 'subjectCalendar/alumno',
    initialState: calendarsAdapter.getInitialState({
        calendar: {
            success: false,
            response: false,
            error: null
        },
        subjects: {
            success: false,
            response: false,
            data: {
            }
        },
        groups: [],
        group: 0,
    }),
    reducers: {},
    extraReducers: {
        [getStudentCalendars.fulfilled]: (state, action) => {
            const { data } = action.payload;
            state.data = data;
        },
        [getStudentSubjects.fulfilled]: (state, action) => {
            state.subjects = action.payload
        },
        [getGroups.fulfilled]: (state, action) => {
            state.groups = action.payload
        },

    }
});

export default subjectCalendaSlice.reducer;