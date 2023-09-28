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
            invalidatesTags: ['userData'],
        }),
        deleteUser: builder.mutation({
            query(id) {
                return {
                    method: 'DELETE',
                    body: '',
                };
            },
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: ['userData'],
        }),
        getUploadImageUrl: builder.query({
            query: () => ({
                url: `/image-url`,
                method: 'POST',
                responseHandler: (response) => response.text(),
            }),
            providesTags: ['userImageUrl'],
        }),
    }),
});

export const {
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useGetUploadImageUrlQuery,
} = authenticatedUserApi;
