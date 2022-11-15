import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCoursesList = createAsyncThunk('TeacherCoursesApp/courses/getCoursesList', async () => {
    const response = await axios.get(process.env.REACT_APP_API + '/thinkific/userCourses');
    const data = await response.data;
    return data;
});

export const getUrl = createAsyncThunk('TeacherCoursesApp/courses/getUrl', async (course_id) => {
    const response = await axios.post(process.env.REACT_APP_API+'/usuario_t/login', {course_id: course_id});
    const data = await response.data;
    if (data) {
        window.location.href = response.data;
    }
    return;
});

const teacherCoursesSlice = createSlice({
	name: 'TeacherCoursesApp/courses',
    initialState: {},
	reducers: {},
	extraReducers: {
		[getCoursesList.fulfilled]: (state, action) => action.payload
	}
});

export default teacherCoursesSlice.reducer;
