import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { baseUrl } from '../../features/commons/Constants';

export const authenticatedApi = createApi({
    reducerPath: 'authenticatedApi',
    baseQuery: createBaseQuery(`${baseUrl}/`),
    endpoints: () => ({}),
});
