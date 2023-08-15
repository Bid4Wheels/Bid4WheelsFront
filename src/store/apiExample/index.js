import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const PAGE_SIZE = 12;

// Esto es una API
export const cardApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pokeapi.co/api/v2%22%7D)',
        reducerPath: 'cardApi',
        endpoints: (builder) => ({
            getPokemonById: builder.query({
                query: (id) => `pokemon/${id}`,
            }),
            getPokemonList: builder.query({
                query: (page) => ({
                    url: 'pokemon',
                    params: { limit: PAGE_SIZE, offset: PAGE_SIZE * (page + 1) },
                }),
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                merge: (currentCache, newItems) => {
                    currentCache.push(...newItems);
                },
                transformResponse: (response) => response.results,
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
            }),
        }),
    }),
});

export const { useGetPokemonByIdQuery, useGetPokemonListQuery } = cardApiSlice;
