import React from 'react';
import { Card, Box, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { differenceInHours, differenceInDays } from 'date-fns';
import colors from '../../utils/desgin/Colors';
import { TimeBar } from './TimeBar';

const AuctionCard = ({ id, creationDate, endDate, image, carName, tags, highestBid }) => {
    const now = new Date();
    const timeDifferenceInHours = differenceInHours(new Date(endDate), now);
    const timeDifferenceInDays = differenceInDays(new Date(endDate), now);
    const nav = useNavigate();

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
                onClick={() => nav(`/auction/${id}`)}
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
                                padding: '2px 1px',
                                marginBottom: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '14px',
                                height: '30px',
                            }}
                        >
                            <TimeBar
                                creationDate={creationDate}
                                deadline={endDate}
                                isSmall
                                latestBid={highestBid}
                            />
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
