import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.bid4wheels.rellum.com.ar/user' }),
    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: { email, password },
            }),
        }),
    }),
});

export const { useLogInMutation } = userApi;
