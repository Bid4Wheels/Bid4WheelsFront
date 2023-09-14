import { createApi } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../features/commons/Constants';
import { createBaseQuery } from '../baseQuery';

export const tagsApiSlice = createApi({
    baseQuery: createBaseQuery(`${baseUrl}/tag`),
    endpoints: (builder) => ({
        getAllTags: builder.query({
            query: () => ({ url: '/all', method: 'GET' }),
        }),
    }),
});

export const { useGetAllTagsQuery } = tagsApiSlice;
