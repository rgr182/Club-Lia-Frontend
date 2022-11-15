import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
// import { getGroup } from './singleGroupSlice';

export const getStudents = createAsyncThunk('groupsApp/students/getStudents', async (params, {dispatch}) => {
	dispatch(setLoading(true));
	const response = await axios.get(process.env.REACT_APP_API+'/students',{ });
	const data = response.data;
	dispatch(setLoading(false));
	return data;
});

const studentsAdapter = createEntityAdapter({});

export const { selectAll: selectStudents, selectById: selectStudentsById } = studentsAdapter.getSelectors(
	state => state.groupsApp.students
);
const studentsSlice = createSlice({
	name: 'groupsApp/students',
	initialState: studentsAdapter.getInitialState({
		// loading: true,
		searchText: '',
		routeParams: {},
		studentDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		studentsAdded: {
			status: false,
			data: []
		},
		studentsRemoved: {
			status: false,
			data: []
		},
	}),
	reducers: {
		setLoading: (state, action) => {
            state.loading = action.payload;
        },
		setStudentsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewStudentDialog: (state, action) => {
			state.studentDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeNewStudentDialog: (state, action) => {
			state.studentDialog = {
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
		setStudentsAdded: (state, action) => {
			state.studentsAdded = {
				status: true,
				data: action.payload,
			};	
		},
		resetStudentsAdded: (state, action) => {
			state.studentsAdded = {
				status: false,
				data: [],
			};	
		},
		setStudentsRemoved: (state, action) => {
			state.studentsRemoved = {
				status: true,
				data: action.payload,
			};	
		},
		resetStudentsRemoved: (state, action) => {
			state.studentsRemoved = {
				status: false,
				data: [],
			};	
		},

	},
	extraReducers: {
		[getStudents.fulfilled]: (state, action) => {
            const { data } = action.payload;
            state.data = data;
        },
	}
});

export const {
	setLoading,
	setStudentsSearchText,
	openNewStudentDialog,
	closeNewStudentDialog,
	openEditStudentDialog,
	closeEditStudentDialog,
	setStudentsAdded,
	resetStudentsAdded,
	setStudentsRemoved,
	resetStudentsRemoved
} = studentsSlice.actions;


export default studentsSlice.reducer;