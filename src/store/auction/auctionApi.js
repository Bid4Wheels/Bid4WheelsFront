import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../baseQuery';
import { baseUrl } from '../../features/commons/Constants';

export const auctionApi = createApi({
    reducerPath: 'authenticatedUserApi',
    baseQuery: createBaseQuery(`${baseUrl}/auction`),
    endpoints: (builder) => ({
        getAuctionById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAuctionByIdQuery } = auctionApi;
