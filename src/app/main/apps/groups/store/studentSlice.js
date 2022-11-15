import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getStudentAverage = createAsyncThunk('studentsApp/students/getStudentsData', async (id) => {
	const response = await axios.get(`${process.env.REACT_APP_API}/studentaverage/${id}`);
	const data = await response.data;
	return data;
});

export const getStudentGroups = createAsyncThunk('studentsApp/students/getStudentGroups', async (id) => {
	const response = await axios.get(`${process.env.REACT_APP_API}/student/groups/${id}`);
	const data = await response.data;
	return data;
});

export const getStudentGroupsIsNotIn = createAsyncThunk('studentsApp/students/getStudentGroupsIsNotIn', async (id) => {
	const response = await axios.get(`${process.env.REACT_APP_API}/student/groupsisnotin/${id}`);
	const data = await response.data;
	return data;
});

export const addToGroup = createAsyncThunk('studentsApp/students/addToGroup', async (params) => {
	var formData = new FormData();
	formData.append('student_id[]', params.student_id);
	Array.isArray(params.group_ids) &&
		params.group_ids.forEach(group_id => {
			formData.append('group_ids[]', group_id);
		});
	const response = await axios.post(`${process.env.REACT_APP_API}/user/to/groups`, formData);
	const data = await response;
	return data;
});

export const removeStudentGroups = createAsyncThunk('studentsApp/students/removeStudentGroups', async (params) => {
	var formData = new FormData();
	formData.append('studentId', params.studentId);
	Array.isArray(params.groupIds) &&
		params.groupIds.forEach(group_id => {
			formData.append('groupIds[]', group_id);
		});
	const response = await axios.post(`${process.env.REACT_APP_API}/alumno/grupos/eliminar`, formData);
	const data = await response;
	return data;
});

export const removeStudentsGroups = createAsyncThunk('studentsApp/students/removeStudentsGroups', async (params) => {
	var formData = new FormData();
	formData.append('students', JSON.stringify(params.students));
	const response = await axios.post(`${process.env.REACT_APP_API}/alumnos/grupos/eliminar`, formData);
	const data = await response;
	return data;
});

const studentAdapter = createEntityAdapter({});

export const { selectAll: selectStudent } = studentAdapter.getSelectors(
    state => state.studentsApp.student
);

const studentSlice = createSlice({
	name: 'studentsApp/student',
	initialState: {
        addToGroupsDialog: {
			props: {
				open: false
			},
			data: null
		},
		groupsAdded: {
			status: '',
		},
		removeStudent: {
			status: '',
		},
		removeStudents: {
			status: '',
		},
    },
	reducers: {
        openAddToGroupsDialog: (state, action) => {
			state.addToGroupsDialog = {
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeAddToGroupsDialog: (state, action) => {
			state.addToGroupsDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditStudentDialog: (state, action) => {
			state.studentDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditStudentDialog: (state, action) => {
			state.studentDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		resetGroupsAdded: (state, action) => {
			state.groupsAdded = {
				status: '',
			};	
		},
		resetRemoveStudent: (state, action) => {
			state.removeStudent = {
				status: '',
			}
		},
		resetRemoveStudents: (state, action) => {
			state.removeStudents = {
				status: '',
			}
		},
    },
	extraReducers: {
        [getStudentAverage.fulfilled]: (state, action) => {
            const { data } = action.payload;
            state.student = data;
        },
        [getStudentGroups.fulfilled]: (state, action) => {
            const { data } = action.payload;
            state.studentGroups = data;
        },
        [getStudentGroupsIsNotIn.fulfilled]: (state, action) => {
            const { data } = action.payload;
            state.studentGroupsIsNotIn = data;
        },
        [addToGroup.fulfilled]: (state, action) => {
            const { data } = action.payload;
			state.groupsAdded = {
				status: data.status,
			};
        },
        [removeStudentGroups.fulfilled]: (state, action) => {
            const { data } = action.payload;
			state.removeStudent = {
				status: data.status,
			};
        },
        [removeStudentsGroups.fulfilled]: (state, action) => {
            const { data } = action.payload;
			state.removeStudents = {
				status: data.status,
			};
        }
	}
});

export const {
	openAddToGroupsDialog,
	closeAddToGroupsDialog,
	resetGroupsAdded,
	resetRemoveStudent,
	resetRemoveStudents,
} = studentSlice.actions;

export default studentSlice.reducer;
