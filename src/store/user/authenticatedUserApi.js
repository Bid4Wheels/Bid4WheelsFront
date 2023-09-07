import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';

export const authenticatedUserApi = createApi({
    reducerPath: 'authenticatedUserApi',
    baseQuery: createBaseQuery('https://api.bid4wheels.com/user'),
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query(payload) {
                const { id: userId, userInfo } = payload;
                return {
                    url: `/${userId}`,
                    method: 'PATCH',
                    body: userInfo,
                };
            },
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useUpdateUserMutation, useGetUserByIdQuery } = authenticatedUserApi;
