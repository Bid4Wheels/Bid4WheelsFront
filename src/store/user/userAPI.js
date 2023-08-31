import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.bid4wheels.com//user' }),
    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: { email, password },
            }),
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET',
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW51bWFzam9hbkBnbWFpbC5jb20iLCJpYXQiOjE2OTMyNTE5NjcsImV4cCI6MTY5Mzg1Njc2N30.4B0KPdII3_uj7hlA6IeU8mzSIo458fCuiS1j8oJR49c',
                },
            }),
        }),
    }),
});

export const { useLogInMutation, useGetUserByIdQuery } = userApi;
