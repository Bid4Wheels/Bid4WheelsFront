import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './user/UserApi';
import userReducer from './user/UserSlice';
import { authApi } from './auth/AuthApi';
import { persistReducer } from 'redux-persist';
import { authenticatedUserApi } from './user/authenticatedUserApi';
import storage from 'redux-persist/lib/storage';
import { tagsApiSlice } from './auction/tagsApi';
import { cardApiSlice } from './auction/auctionApi';

const reducers = combineReducers({
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [authenticatedUserApi.reducerPath]: authenticatedUserApi.reducer,
    [cardApiSlice.reducerPath]: cardApiSlice.reducer,
    [tagsApiSlice.reducerPath]: tagsApiSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            authApi.middleware,
            authenticatedUserApi.middleware,
            tagsApiSlice.middleware,
            cardApiSlice.middleware,
        ),
});
