import React from 'react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

export const createBaseQuery = (baseUrl) => {
    return fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });
};
