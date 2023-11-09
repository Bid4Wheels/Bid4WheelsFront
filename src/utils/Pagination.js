import React from 'react';
import { Pagination as MUIPagination } from '@mui/material';
import colors from './desgin/Colors';
import theme from './desgin/Theme';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (event, page) => {
        onPageChange(page);
    };

    return (
        <MUIPagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="water_green"
        />
    );
};

export default Pagination;
