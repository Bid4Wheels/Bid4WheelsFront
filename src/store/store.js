import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './user/UserApi';
import userReducer from './user/UserSlice';
import { authApi } from './auth/AuthApi';
import { persistReducer } from 'redux-persist';
import { authenticatedUserApi } from './user/authenticatedUserApi';
import { auctionApi } from './auction/auctionApi';
import storage from 'redux-persist/lib/storage';
import { tagsApiSlice } from './auction/tagsApi';
import { bidApi } from './auction/bidApi';
import { authenticatedApi } from './mainApis/authenticatedApi';
import { unauthenticatedApi } from './mainApis/unauthenticatedApi';
import { questionsAndAnswersApi } from './auction/questionsAndAnswersApi';
import errorReducer from './errorHandling/errorSlice';

const reducers = combineReducers({
    user: userReducer,
    errorList: errorReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [auctionApi.reducerPath]: auctionApi.reducer,
    [authenticatedUserApi.reducerPath]: authenticatedUserApi.reducer,
    [tagsApiSlice.reducerPath]: tagsApiSlice.reducer,
    [auctionApi.reducerPath]: auctionApi.reducer,
    [bidApi.reducerPath]: bidApi.reducer,
    [authenticatedApi.reducerPath]: authenticatedApi.reducer,
    [unauthenticatedApi.reducerPath]: unauthenticatedApi.reducer,
    [questionsAndAnswersApi.reducerPath]: questionsAndAnswersApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            userApi.middleware,
            authApi.middleware,
            authenticatedUserApi.middleware,
            tagsApiSlice.middleware,
            auctionApi.middleware,
            bidApi.middleware,
            authenticatedApi.middleware,
            unauthenticatedApi.middleware,
            questionsAndAnswersApi.middleware,
        ),
});
