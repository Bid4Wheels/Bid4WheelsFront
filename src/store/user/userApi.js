import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.bid4wheels.com/',
    }),
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (userId, userInfo) => ({
                url: `PATCH /user/${userId}`,
                method: 'PATCH',
                body: userInfo,
            }),
        }),
    }),
});

export const { useUpdateUserMutation } = userApi;
