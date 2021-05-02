import { configureStore } from '@reduxjs/toolkit'
import cordsReducer from './cords/cords'
import algReducer from './alg/alg'

export default configureStore({
    reducer: {
        cords: cordsReducer,
        alg: algReducer
    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }))
})