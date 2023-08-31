import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authenticatedUserApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.bid4wheels.com/user',
        prepareHeaders: (headers) => {
            headers.set(
                'authorization',
                `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW51bWFzam9hbkBnbWFpbC5jb20iLCJpYXQiOjE2OTMyNTE5NjcsImV4cCI6MTY5Mzg1Njc2N30.4B0KPdII3_uj7hlA6IeU8mzSIo458fCuiS1j8oJR49c`,
            );
            return headers;
        },
    }),
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
    }),
});

export const { useUpdateUserMutation } = authenticatedUserApi;
