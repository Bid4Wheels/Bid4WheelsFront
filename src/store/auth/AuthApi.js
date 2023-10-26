import { unauthenticatedApi } from '../mainApis/unauthenticatedApi';

const baseUrl = '/auth';

export const authApi = unauthenticatedApi.injectEndpoints({
    reducerPath: 'authApi',

    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: ({ email, password }) => ({
                url: `${baseUrl}/login`,
                method: 'POST',
                body: { email, password },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLogInMutation } = authApi;
