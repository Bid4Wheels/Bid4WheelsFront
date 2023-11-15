import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import colors from '../../utils/desgin/Colors';
import { differenceInSeconds } from 'date-fns';

export function TimeBar({ creationDate, deadline, isSmall = false, latestBid = null }) {
    const now = new Date();
    const totalSeconds = differenceInSeconds(new Date(deadline), new Date(creationDate));
    const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newRemainingSeconds = differenceInSeconds(new Date(deadline), new Date());
            setRemainingSeconds(newRemainingSeconds);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [deadline]);

    const days = Math.floor(remainingSeconds / (60 * 60 * 24));
    const hours = Math.floor((remainingSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    const seconds = remainingSeconds % 60;
    const timeElapsedInSeconds = differenceInSeconds(now, new Date(creationDate));
    const isTimeBarShown = timeElapsedInSeconds < totalSeconds;
    var percentage = Math.floor(((totalSeconds - timeElapsedInSeconds) / totalSeconds) * 100);
    const size = isSmall ? 'small' : '18px';

    let color = colors.green;

    if (days >= 1) {
        percentage = 100;
    } else if (hours >= 1) {
        if (minutes >= 1) {
            percentage = ((hours + minutes / 60) / 24) * 100;
        } else {
            color = colors.yellow;
            percentage = 100;
        }
    } else if (minutes >= 1) {
        percentage = (minutes / 60) * 100;
        color = colors.yellow;
    } else if (minutes === 1) {
        color = colors.red;
        percentage = 100;
    } else {
        percentage = (seconds / 60) * 100;
        color = colors.red;
    }

    const slidingWidth = `${percentage}%`;

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: '5px',
                backgroundColor: colors.grey,
                position: 'relative',
            }}
        >
            {isTimeBarShown ? (
                <>
                    <Box
                        sx={{
                            width: slidingWidth,
                            height: '100%',
                            backgroundColor: color,
                            borderRadius: '5px',
                            display: 'flex',
                            maxWidth: '100%',
                            transition: 'width 1s',
                        }}
                    ></Box>
                    <Typography
                        sx={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontWeight: 600,
                            fontSize: size,
                        }}
                    >
                        {`${days > 0 ? `${days} d, ` : ''}${hours} hr, ${minutes}:${
                            seconds < 10 ? `0${seconds}` : seconds
                        } min left`}
                    </Typography>
                </>
            ) : (
                <Typography
                    sx={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontWeight: 600,
                        fontSize: size,
                    }}
                >
                    Finished
                </Typography>
            )}
            {latestBid && (
                <Typography
                    sx={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: size,
                        fontWeight: 600,
                    }}
                >
                    Latest: <b>${latestBid}</b>
                </Typography>
            )}
        </Box>
    );
}
