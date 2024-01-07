import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './authSlice'
const store=configureStore({
    reducers:AuthReducer
})

export default store;