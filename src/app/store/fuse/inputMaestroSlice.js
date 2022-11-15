import { createSlice } from '@reduxjs/toolkit'; 

const inputMaestroSlice = createSlice({
	name: 'input',
	initialState: {texto: ''},
	reducers: {
        setUserName: (state, action) => {
            state.texto = action.payload
        },
    }
});

export const { setUserName } = inputMaestroSlice.actions;

export default inputMaestroSlice.reducer;

