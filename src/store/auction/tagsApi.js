import { createApi } from '@reduxjs/toolkit/dist/query';

const tempUrl = 'api.bid4wheels.com';

export const tagsApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://${tempUrl}/tags`,
    }),
    endpoints: (builder) => ({
        getAllTags: builder.query({
            query: () => ({ url: '/all', method: 'GET' }),
        }),
    }),
});
