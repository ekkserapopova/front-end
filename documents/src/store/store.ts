import {configureStore} from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import authReducer from './slices/authSlice'
import min_priceReducer from './slices/priceMinSlice'
import max_priceReducer from './slices/priceMaxSlice'
import draftReducer from './slices/draftSlice'
import userReducer from './slices/userSlice'

export const store =  configureStore({
    reducer:{
        search: searchReducer,
        auth: authReducer,
        min_price: min_priceReducer,
        max_price: max_priceReducer,
        draft: draftReducer,
        user: userReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>