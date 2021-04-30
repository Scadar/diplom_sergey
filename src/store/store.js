import { configureStore } from '@reduxjs/toolkit'
import cordsReducer from './cords/cords'


export default configureStore({
    reducer: {
        cords: cordsReducer
    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }))
})