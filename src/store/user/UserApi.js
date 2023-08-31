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
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW51bWFzam9hbkBnbWFpbC5jb20iLCJpYXQiOjE2OTMyNTE5NjcsImV4cCI6MTY5Mzg1Njc2N30.4B0KPdII3_uj7hlA6IeU8mzSIo458fCuiS1j8oJR49c',
                },
            }),
        }),
    }),
});

export const { useSignUpMutation, useGetUserByIdQuery } = userApi;
