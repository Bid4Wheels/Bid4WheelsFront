import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { cardApiSlice } from './apiExample';
import { userApi } from './user/userApi';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [cardApiSlice.reducerPath]: cardApiSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardApiSlice.middleware).concat(userApi.middleware),
});
