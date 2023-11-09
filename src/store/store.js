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
import { stompMiddleware } from './stomp/stompMiddleware';
import { stompReducer } from './stomp/stompSlice';
import successSnackbarReducer from './success/successSlice';
import errorReducer from './errorHandling/errorSlice';
import { rtkQueryErrorLogger } from './errorHandling/errorMiddleware';
import { reviewApi } from './auction/reviewApi';

const reducers = combineReducers({
    user: userReducer,
    stomp: stompReducer,
    successSnackbar: successSnackbarReducer,
    errorList: errorReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [auctionApi.reducerPath]: auctionApi.reducer,
    [authenticatedUserApi.reducerPath]: authenticatedUserApi.reducer,
    [tagsApiSlice.reducerPath]: tagsApiSlice.reducer,
    [auctionApi.reducerPath]: auctionApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
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
            auctionApi.middleware,
            bidApi.middleware,
            authenticatedApi.middleware,
            unauthenticatedApi.middleware,
            questionsAndAnswersApi.middleware,
            stompMiddleware,
            rtkQueryErrorLogger,
        ),
});
