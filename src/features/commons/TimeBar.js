import { Box, Typography } from '@mui/material';
import React from 'react';
import colors from '../../utils/desgin/Colors';
import { differenceInSeconds } from 'date-fns';

export function TimeBar({ creationDate, deadline, isSmall = false, latestBid = null }) {
    const now = new Date();
    const timeDifferenceInSeconds = differenceInSeconds(new Date(deadline), now);
    const days = Math.floor(timeDifferenceInSeconds / (60 * 60 * 24));
    const hours = Math.floor((timeDifferenceInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeDifferenceInSeconds % (60 * 60)) / 60);
    const seconds = timeDifferenceInSeconds % 60;
    const timeElapsedInSeconds = differenceInSeconds(now, new Date(creationDate));
    const totalSeconds = differenceInSeconds(new Date(deadline), new Date(creationDate));
    const percentage = Math.floor(((totalSeconds - timeElapsedInSeconds) / totalSeconds) * 100);
    const size = isSmall ? 'small' : '18px';

    console.log('percentage', percentage);
    console.log('timeElapsedInSeconds', timeElapsedInSeconds);
    console.log('totalSeconds', totalSeconds);
    console.log('timeDifferenceInSeconds', timeDifferenceInSeconds);
    console.log('creation', creationDate);
    console.log('deadline', deadline);
    console.log('now', now);

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
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: color,
                    borderRadius: '20px',
                    display: 'flex',
                }}
            ></Box>
            <Typography
                sx={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: 400,
                    fontSize: size,
                }}
            >
                {`${days > 0 ? `${days} d, ` : ''}${hours} hr, ${minutes}:${
                    seconds < 10 ? `0${seconds}` : seconds
                } min left`}
            </Typography>
            {latestBid && (
                <Typography
                    sx={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: size,
                    }}
                >
                    Latest: <b>${latestBid}</b>
                </Typography>
            )}
        </Box>
    );
}
