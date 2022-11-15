import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getContacts} from "./contactsSlice";

const filterSlice = createSlice({
	name: 'filterApp',
	initialState: {},
	reducers: {
		setContactsFilter: (state, action) => {
			state.contacts = action.payload;
		}

	},
});

export const {
	setContactsFilter
} = filterSlice.actions;

export default filterSlice.reducer;
