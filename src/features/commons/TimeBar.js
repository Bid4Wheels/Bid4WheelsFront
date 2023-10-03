import { Box, Typography } from '@mui/material';
import React from 'react';
import colors from '../../utils/desgin/Colors';
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
} from 'date-fns';

export function TimeBar({ deadline, isSmall = false, latestBid = null }) {
    const now = new Date();
    const timeDifferenceInSeconds = differenceInSeconds(new Date(deadline), now);
    const days = Math.floor(timeDifferenceInSeconds / (60 * 60 * 24));
    const hours = Math.floor((timeDifferenceInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeDifferenceInSeconds % (60 * 60)) / 60);
    const seconds = timeDifferenceInSeconds % 60;
    const percentage = Math.round(100 - (timeDifferenceInSeconds / (24 * 60 * 60)) * 100);
    const size = isSmall ? 'small' : '18px';

    let color = colors.green;
    if (days < 1) {
        color = colors.yellow;
        if (hours < 1) {
            color = colors.red;
            if (hours < 0) {
                color = colors.grey;
            }
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                backgroundColor: colors.grey,
            }}
        >
            <Box
                sx={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: color,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography sx={{ fontWeight: 400, fontSize: size, marginLeft: '10px' }}>
                    {days > 0 ? `${days}:` : ''}
                    {`${hours}:${minutes}:${seconds}`}
                </Typography>
                {latestBid && (
                    <Typography sx={{ fontSize: size, marginRight: '10px' }}>
                        Latest: <b>${latestBid}</b>
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
