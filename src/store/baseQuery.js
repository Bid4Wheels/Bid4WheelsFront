import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

export const createBaseQuery = (baseUrl) => {
    return fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = useSelector((state) => state.user.token);
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });
};
