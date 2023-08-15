import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { cardApiSlice } from './apiExample';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [cardApiSlice.reducerPath]: cardApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardApiSlice.middleware),
});
