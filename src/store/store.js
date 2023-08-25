import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { userApi } from './user/UserApi';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});
