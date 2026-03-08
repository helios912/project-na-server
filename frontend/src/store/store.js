import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
