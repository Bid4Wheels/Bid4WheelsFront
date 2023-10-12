import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../features/commons/Constants';

export const unauthenticatedApi = createApi({
    reducerPath: 'unauthenticatedApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: () => ({}),
});
