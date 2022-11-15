import { createSlice, createAsyncThunk, createEntityAdapter, getType } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContacts = createAsyncThunk('contactsApp/contacts/getContacts', async () => {
	// routeParams = routeParams || getState().contactsApp.contacts.routeParams;
	// let filterContacts = getState().contactsApp.filter.contacts;
	const response = await axios.get(process.env.REACT_APP_API+'/usuarios');
	const data = await response.data.data;
	return { data };
});

export const getGroupStudents = createAsyncThunk('groupApp/groupstudents/getGroupStudents', async (ids) => {

	var formData = new FormData();
	formData.append('ids', ids);

	const response = await axios.post(process.env.REACT_APP_API+'/grupos/studentsByGroup', formData, {
		headers: {
			'x-amz-acl': 'public-read',
			'Content-Type': 'multipart/form-data',
		}},);
	const data = await response.data.data;
	return { data }; 
});

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
	state => state.groupApp.groupstudents
);

const contactsSlice = createSlice({
    name: 'groupApp/groupstudents',
    initialState: contactsAdapter.getInitialState({
        tokenDialog: {
            type: '',
            props: {
                open: false
            },
            data: null
        },
        groupstudents: ''
    }),
    extraReducers: {
        [getGroupStudents.fulfilled]: (state, action) => {
            console.log(action.payload)
            const { data } = action.payload;
            state.groupstudents = data;
        }
    }
});


export default contactsSlice.reducer;
