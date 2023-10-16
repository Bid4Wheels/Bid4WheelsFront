import { unauthenticatedApi } from '../mainApis/unauthenticatedApi';

const baseUrl = '/user';

export const userApi = unauthenticatedApi.injectEndpoints({
    reducerPath: 'userApi',

    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (payload) => ({
                url: `${baseUrl}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
            }),
        }),
        changePassword: builder.mutation({
            query: (payload) => ({
                url: `${baseUrl}/password`,
                method: 'PATCH',
                body: payload,
            }),
        }),
        sendValidationCode: builder.mutation({
            query: (payload) => ({
                url: `${baseUrl}`,
                method: 'PATCH',
                body: payload,
            }),
        }),
        getValidationCode: builder.mutation({
            query: (payload) => ({
                url: `${baseUrl}/password`,
                method: 'POST',
                body: payload,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useSignUpMutation,
    useChangePasswordMutation,
    useSendValidationCodeMutation,
    useGetValidationCodeMutation,
} = userApi;
