import { authenticatedApi } from '../mainApis/authenticatedApi';

const baseUrl = '/tag';

export const tagsApiSlice = authenticatedApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTags: builder.query({
            query: () => ({ url: `${baseUrl}/all`, method: 'GET' }),
            providesTags: ['tags'],
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllTagsQuery } = tagsApiSlice;
