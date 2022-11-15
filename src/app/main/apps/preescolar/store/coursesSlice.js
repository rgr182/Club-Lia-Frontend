import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCoursesList = createAsyncThunk('PreescolarApp/courses/getCoursesList', async () => {
    const response = await axios.get(process.env.REACT_APP_API + '/thinkific/userCourses');
    const data = await response.data;
    return data;
});

export const getUrl = createAsyncThunk('PreescolarApp/courses/getUrl', async (course_id) => {
    const response = await axios.post(process.env.REACT_APP_API+'/usuario_t/login', {course_id: course_id});
    const data = await response.data;
    if (data) {
        window.location.href = response.data;
    }
    return;
});

export const makeWish = createAsyncThunk('PreescolarApp/courses/makeWish', async (course_id) => {
    const response = await axios.post(process.env.REACT_APP_API+'/makewish', {course_id: course_id});
    return;
});

export const deleteWish = createAsyncThunk('PreescolarApp/courses/deleteWish', async (course_id) => {
    const response = await axios.delete(process.env.REACT_APP_API+'/deletewish/'+course_id);
    return;
});

const coursesAdapter = createEntityAdapter({});

const coursesSlice = createSlice({
	name: 'PreescolarApp/courses',
    initialState: coursesAdapter.getInitialState({
		data: {}
	}),
	reducers: {
		setWish: (state, action) => {
            state.data.courses[action.payload].wish = !state.data.courses[action.payload].wish;
		},
	},
	extraReducers: {
        [getCoursesList.fulfilled]: (state, action) => {
			state.data = action.payload;
		}
    }
});

export const { setWish } = coursesSlice.actions;

export default coursesSlice.reducer;
