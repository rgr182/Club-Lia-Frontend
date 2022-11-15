import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { showMessage } from 'app/store/fuse/messageSlice';

export const getCoursesList = createAsyncThunk('DashboardParentApp/courses/getCoursesList', async () => {
	try {
		const response = await axios.get(process.env.REACT_APP_API + '/thinkific/childCourses');
		const data = await response.data;
		return data;
	} catch (e) {
		console.log(e);
	}
});


export const getUrl = createAsyncThunk('PreescolarApp/courses/getUrl', async (course_id) => {
    const response = await axios.post(process.env.REACT_APP_API+'/usuario_t/login', {course_id: course_id});
    const data = await response.data;
    if (data) {
        window.location.href = response.data;
    }
    return;
});

const coursesAdapter = createEntityAdapter({});

const coursesSlice = createSlice({
	name: 'DashboardParentApp/courses',
	initialState: coursesAdapter.getInitialState({
		courses: null,
	}),
	reducers: {},
	extraReducers: {
		[getCoursesList.fulfilled]: (state, action) => {
			state.courses = action.payload;
		}
	}
});

// export const {} = coursesSlice.actions;

export default coursesSlice.reducer;
