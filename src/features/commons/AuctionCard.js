import React from 'react';
import { Card, Box, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';
import {
    formatDistanceToNow,
    isWithinInterval,
    differenceInHours,
    differenceInDays,
    differenceInMinutes,
    differenceInSeconds,
} from 'date-fns';
import colors from '../../utils/desgin/Colors';

const AuctionCard = ({ endDate, image, carName, tags, highestBid }) => {
    const now = new Date();
    const timeDifferenceInHours = differenceInHours(new Date(endDate), now);
    const timeDifferenceInMinutes = differenceInMinutes(new Date(endDate), now);
    const timeDifferenceInSeconds = differenceInSeconds(new Date(endDate), now);
    const timeDifferenceInDays = differenceInDays(new Date(endDate), now);

    let color = colors.green;
    if (timeDifferenceInDays < 1) {
        color = colors.yellow;
        if (timeDifferenceInHours < 1) {
            color = colors.red;
            if (timeDifferenceInHours < 0) {
                color = colors.grey;
            }
        }
    }

    return (
        <Box>
            <Card
                sx={{
                    objectFit: 'scale-down',
                    display: 'inline-block',
                    margin: '10px',
                    transition: 'transform 0.2s ease-in-out',
                    ':hover': { transform: 'scale(1.05)' },
                }}
            >
                <CardActionArea>
                    <CardMedia
                        sx={{
                            border: `2px solid ${color}`,
                            height: '204px',
                            width: '317px',
                            borderBottom: '0px',
                        }}
                        component="img"
                        src={image}
                        alt={carName}
                    />
                    <CardContent
                        sx={{
                            padding: 1,
                            '&:last-child': {
                                paddingBottom: 0,
                            },
                        }}
                    >
                        <Typography gutterBottom variant="XSmall" component="div">
                            {carName}
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: color,
                                borderRadius: '10px',
                                padding: '4px 2px',
                                marginBottom: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: '14px',
                            }}
                        >
                            <Typography gutterBottom variant="XSmall">
                                {timeDifferenceInHours}:
                                {timeDifferenceInMinutes < 10
                                    ? `0${timeDifferenceInMinutes}`
                                    : `${timeDifferenceInMinutes % 60}`}
                                :
                                {timeDifferenceInSeconds < 10
                                    ? `0${timeDifferenceInSeconds % 60}`
                                    : `${timeDifferenceInSeconds % 60}`}
                            </Typography>
                            <Typography gutterBottom variant="XSmall">
                                Latest: <b>${highestBid}</b>
                            </Typography>
                        </Box>

                        <Box display="flex" gap="3px">
                            {tags.map((tag, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        backgroundColor: colors.grey,
                                        borderRadius: '10px',
                                        padding: '4px 8px',
                                        display: 'inline-block',
                                    }}
                                >
                                    <Typography gutterBottom variant="XSmall" component="div">
                                        {tag}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};

export default AuctionCard;
