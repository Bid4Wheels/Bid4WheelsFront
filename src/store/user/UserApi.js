import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../features/commons/Constants';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/user`,
    }),

    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (payload) => ({
                url: '',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
            }),
        }),
        changePassword: builder.mutation({
            query: (payload) => ({
                url: '/password',
                method: 'PATCH',
                body: payload,
            }),
        }),
        sendValidationCode: builder.mutation({
            query: (payload) => ({
                url: '',
                method: 'PATCH',
                body: payload,
            }),
        }),
        getValidationCode: builder.mutation({
            query: (payload) => ({
                url: '/password',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

export const {
    useSignUpMutation,
    useChangePasswordMutation,
    useSendValidationCodeMutation,
    useGetValidationCodeMutation,
} = userApi;
