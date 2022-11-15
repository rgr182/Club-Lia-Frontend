import { createSlice } from '@reduxjs/toolkit'

export const soundSlice = createSlice({
    name: 'sound',
    initialState: {
        value: false,
    },
    reducers: {
        mute: (state) => {
            state.value = !state.value;
        },
    }
})

export const { mute } = soundSlice.actions

export default soundSlice.reducer