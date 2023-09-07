import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../features/commons/Constants';

export const tagsApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/tags`,
    }),
    endpoints: (builder) => ({
        getAllTags: builder.query({
            query: () => ({ url: '/all', method: 'GET' }),
        }),
    }),
});

export const { useGetAllTagsQuery } = tagsApiSlice;
