import { authenticatedApi } from '../mainApis/authenticatedApi';

const baseUrl = '/user';

export const authenticatedUserApi = authenticatedApi.injectEndpoints({
    reducerPath: 'authenticatedUserApi',
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query(payload) {
                const { id: userId, userInfo } = payload;
                return {
                    url: `${baseUrl}/${userId}`,
                    method: 'PATCH',
                    body: userInfo,
                };
            },
            invalidatesTags: ['userData'],
        }),
        deleteUser: builder.mutation({
            query(id) {
                return {
                    url: `${baseUrl}`,
                    method: 'DELETE',
                    body: '',
                };
            },
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${baseUrl}/${id}`,
                method: 'GET',
            }),
            providesTags: ['userData'],
        }),
        getUploadImageUrl: builder.query({
            query: () => ({
                url: `${baseUrl}/image-url`,
                method: 'POST',
                responseHandler: (response) => response.text(),
            }),
            providesTags: ['userImageUrl'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useGetUploadImageUrlQuery,
} = authenticatedUserApi;
