import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.bid4wheels.com',
    }),
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (id) => `/user/${id}`,
            headers: {
                Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW51bWFzam9hbkBnbWFpbC5jb20iLCJpYXQiOjE2OTMyNTE5NjcsImV4cCI6MTY5Mzg1Njc2N30.4B0KPdII3_uj7hlA6IeU8mzSIo458fCuiS1j8oJR49c'}`,
            },
        }),
    }),
});

export const { useGetUserByIdQuery } = UserApi;
