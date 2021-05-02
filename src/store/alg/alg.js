import { createSlice } from '@reduxjs/toolkit'

export const algSlice = createSlice({
    name: 'alg',
    initialState: {
        standardDeviation: {}
    },
    reducers: {
        setStandardDeviation: (state, action) => {
            state.standardDeviation = action.payload
        },
    },
})

export const {setStandardDeviation } = algSlice.actions

export default algSlice.reducer