import { createSlice } from '@reduxjs/toolkit'

export const cordsSlice = createSlice({
    name: 'cords',
    initialState: {
        stringCalculatedCords: '',
        stringRealCords: '',
        stringDiffCords: '',
        calculatedCords: [],
        realCords: [],
        diffCords: [],
    },
    reducers: {
        setStringCalculatedCords: (state, action) => {
            state.stringCalculatedCords = action.payload
        },
        setStringRealCords: (state, action) => {
            state.stringRealCords = action.payload
        },
        setStringDiffCords: (state, action) => {
            state.stringDiffCords = action.payload
        },
        setCalculatedCords: (state, action) => {
            state.calculatedCords = action.payload
        },
        setRealCords: (state, action) => {
            state.realCords = action.payload
        },
        setDiffCords: (state, action) => {
            state.diffCords = action.payload
        },
    },
})

export const { setDiffCords, setRealCords,setStringDiffCords,setStringCalculatedCords,setStringRealCords,setCalculatedCords } = cordsSlice.actions

export default cordsSlice.reducer