import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { cardApiSlice } from './apiExample';
import { UserApiSlice } from './user/userAPI';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [cardApiSlice.reducerPath]: cardApiSlice.reducer,
        [UserApiSlice.reducerPath]: UserApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardApiSlice.middleware).concat(UserApiSlice.middleware),
});
