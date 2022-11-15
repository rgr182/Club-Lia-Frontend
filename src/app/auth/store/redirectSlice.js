import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from 'app/services/jwtService';
// import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getPHPFoxUrl = createAsyncThunk('auth/redirect/getPHPFoxUrl', async () => {
    const response = await axios.post(process.env.REACT_APP_API+'/usuario_p/getRoute',{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});

const redirectAdapter = createEntityAdapter({});

// export const { selectAll: selectUrl, selectUrlById: selectById } = redirectAdapter.getSelectors(
// 	state => state.auth.redirect
// );
const redirectSlice = createSlice({
	name: 'auth/redirect',
	initialState: redirectAdapter.getInitialState({
		redirectValue: {
			data: null
		},
		// calendar: {
		// 	success: false,
		// 	response: false,
		// 	error: null
		// }
	}),
	reducers: {
		setRedirect: (state, action) => {
			state.redirectValue = {
				data: action.payload
			};
		},
		resetRedirect: (state, action) => {
			state.redirectValue = {
				data: null
			};
		},
	},
	extraReducers: {

        [getPHPFoxUrl.fulfilled]: (state, action) => {
            state.data = action.payload
        }

        


		// [getPHPFoxUrl.fulfilled]: (state, action) => {
		// 	const { data, routeParams } = action.payload;
		// 	state.data = data;
		// }

        // [getPHPFoxUrl.fulfilled]: (state, action) => {
		// 	const { data } = action.payload;
		// 	state.data = data;
		// 	// redirectAdapter.setAll(state, data);
		// 	// state.routeParams = routeParams;
		// 	// state.searchText = '';
		// }
	}
});

export const {
	setRedirect,
	resetRedirect,
} = redirectSlice.actions;


export default redirectSlice.reducer;
