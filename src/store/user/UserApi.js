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
        getUserById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWlsMUBtYWlsLmNvbSIsImlhdCI6MTY5NDA1MDUzNiwiZXhwIjoxNjk0NjU1MzM2fQ.5hnteOIxHbPzbbVexY_BWXdD5a13oNBSmJTBX9BALGI',
                },
            }),
        }),
    }),
});

export const { useSignUpMutation, useGetUserByIdQuery } = userApi;
