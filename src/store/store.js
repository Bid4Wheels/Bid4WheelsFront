import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import { cardApiSlice } from './apiExample';
import { userApi } from './user/userAPI';
import userReducer from './user/UserSlice';
import { persistReducer } from 'redux-persist';
import { authenticatedUserApi } from './user/authenticatedUserApi';

const reducers = combineReducers({
    counter: counterReducer,
    user: userReducer,
    [cardApiSlice.reducerPath]: cardApiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authenticatedUserApi.reducerPath]: authenticatedUserApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cardApiSlice.middleware,
            userApi.middleware,
            authenticatedUserApi.middleware,
        ),
});
