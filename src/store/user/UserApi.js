import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../features/commons/Constants';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (payload) => ({
                url: '/user',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

export const { useSignUpMutation } = userApi;
