import React from 'react';
import { Card, Box, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';
import {
    formatDistanceToNow,
    isWithinInterval,
    differenceInHours,
    differenceInDays,
    differenceInMinutes,
} from 'date-fns';

const AuctionCard = ({ auction }) => {
    const AucitonCard = (auction) => { const {endDate, image, carName, tags} = auction
    const now = new Date();
    const timeDifferenceInHours = differenceInHours(endDate, now);
    const timeDifferenceInMinutes = differenceInMinutes(endDate, now);
    const timeDifferenceInDays = differenceInDays(endDate, now);

    let color = '#75EB3E';
    if (timeDifferenceInDays < 1) {
        color = '#FFCD4B';
        if (timeDifferenceInHours < 1) {
            color = '#E67754';
            if (timeDifferenceInHours < 0) {
                color = '#D9D9D9';
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
                                padding: '4px 8px',
                                width: 'fit-content',
                                marginBottom: '8px',
                            }}
                        >
                            <Typography gutterBottom variant="Small">
                                {timeDifferenceInHours > 0
                                    ? `${timeDifferenceInHours}:${timeDifferenceInMinutes % 60}`
                                    : timeDifferenceInMinutes > 0
                                    ? `00:${timeDifferenceInMinutes}`
                                    : 'Closed'}
                            </Typography>
                        </Box>
                        <Box display="flex" gap="3px">
                            {tags.map((tag, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        backgroundColor: '#D9D9D9',
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
