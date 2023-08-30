import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './user/userApi';
import userReducer from './user/userSlice';
import { authApi } from './auth/authApi';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, authApi.middleware),
});
