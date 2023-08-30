import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { cardApiSlice } from './apiExample';
import { authenticatedUserApi } from './user/authenticatedUserApi';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [cardApiSlice.reducerPath]: cardApiSlice.reducer,
        [authenticatedUserApi.reducerPath]: authenticatedUserApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(cardApiSlice.middleware)
            .concat(authenticatedUserApi.middleware),
});
