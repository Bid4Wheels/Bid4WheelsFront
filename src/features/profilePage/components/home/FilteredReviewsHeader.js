import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';

export function FilteredReviewsHeader({ filterValue }) {
    return (
        <Box>
            <Box display={'flex'} alignItems={'end'}>
                <Typography
                    fontWeight="bold"
                    fontSize={theme.typography.Medium}
                    fontFamily={theme.typography.fontFamily}
                >
                    Showing filter results for
                </Typography>
                <Rating
                    value={filterValue}
                    size="large"
                    readOnly
                    sx={{
                        '& .MuiRating-iconFilled': {
                            color: colors.water_green,
                        },
                        mt: '5px',
                        ml: '10px',
                    }}
                    precision={0.5}
                ></Rating>
            </Box>
        </Box>
    );
}
