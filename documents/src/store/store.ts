import {configureStore} from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import authReducer from './slices/authSlice'

export const store =  configureStore({
    reducer:{
        search: searchReducer,
        auth: authReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>