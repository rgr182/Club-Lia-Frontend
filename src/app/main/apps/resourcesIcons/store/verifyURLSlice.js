import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';


export const getVerify = createAsyncThunk('ResourcesIconsApp/verifyURL/getVerify', async (url, {dispatch}) => {
    
    let values = { src: url };

	const response = await axios.get(process.env.REACT_APP_API+'/verifyURL',{
        params: values
    }).then(response  => {
        if (response.data.data == 0 ) {
            dispatch(setValidURLTrue(url));
        } else {
            dispatch(setValidURLFalse(url));
        }
    });
    
	const data = await response.data;
	return data;
});

const verifyAdapter = createEntityAdapter({});

const verifyURLSlice = createSlice({
	name: 'ResourcesIconsApp/verifyURL',
	initialState: verifyAdapter.getInitialState({
		validURL:  {
            valid: false,
            url: ''
		},
	}),
    reducers: {
        setValidURLTrue: (state, action) => {
            state.validURL = {
                valid: true,
                url: action.payload
            }
        },
        setValidURLFalse: (state, action) => {
            state.validURL = {
                valid: false,
                url: action.payload
            }
        },
        setValidURLReset: (state, action) => {
            state.validURL = {
                valid: false,
                url: ''
            }
        },
    },
	extraReducers: {
		[getVerify.fulfilled]: (state, action) => action.payload
	}
});
export const {
    setValidURLTrue,
    setValidURLFalse,
    setValidURLReset
} = verifyURLSlice.actions;

export default verifyURLSlice.reducer;