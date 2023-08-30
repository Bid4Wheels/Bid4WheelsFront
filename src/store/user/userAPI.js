import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../features/commons/Constants';
//
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
    }),
});

export const { useSignUpMutation } = userApi;
