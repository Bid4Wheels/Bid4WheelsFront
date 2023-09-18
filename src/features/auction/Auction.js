import React, { useState } from 'react';
import {
    Grid,
    Typography,
    Chip,
    Box,
    Toolbar,
    Button,
    Skeleton,
    Alert,
    AlertTitle,
} from '@mui/material';
import { useParams } from 'react-router';
import {
    differenceInHours,
    differenceInDays,
    differenceInMinutes,
    differenceInSeconds,
} from 'date-fns';
import car1 from '../commons/temp/car1.jpeg';
import car2 from '../commons/temp/car2.jpeg';
import car3 from '../commons/temp/car3.jpeg';
import car4 from '../commons/temp/car4.jpeg';
import car5 from '../commons/temp/car5.jpg';
import { TechnicalInfo } from './TechnicalInfo';
import { ImageCarousel } from './ImageCarousel';
import colors from '../../utils/desgin/Colors';
import { useGetAuctionByIdQuery } from '../../store/auction/auctionApi';
import { useSelector } from 'react-redux';
import { DangerZone } from './DeleteWidget';

export function Auction() {
    const id = useParams().auctionId;
    const [window, setWindow] = useState('info');

    const { data, error, isLoading } = useGetAuctionByIdQuery(id);

    const images = data?.auctionImageUrl.filter((image) => image !== 'default') || [];
    const tags = ['Sedan', 'Low mileage', 'Great condition', 'One owner'];

    if (isLoading) {
        return (
            <Grid
                container
                sx={{
                    gap: 2,
                    padding: '30px',
                    paddingTop: '10px',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                }}
            >
                <Grid item xs={12} sm={7} sx={{ padding: '20px' }}>
                    <Box>
                        <Typography variant="h1">
                            <Skeleton />
                        </Typography>
                    </Box>

                    <Box item>
                        <Skeleton variant="rectangular" width="100%" height="300px" />
                    </Box>
                    <Box
                        item
                        sx={{
                            marginTop: '10px',
                        }}
                    >
                        <Skeleton variant="rectangular" width="100%" height="100px" />
                    </Box>
                    <Box
                        item
                        sx={{
                            marginTop: '10px',
                        }}
                    >
                        <Skeleton variant="rectangular" width="100%" height="300px" />
                    </Box>
                </Grid>
            </Grid>
        );
    }

    if (error) {
        return (
            <div>
                <Alert severity="error" sx={{ margin: '2rem' }}>
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error.data}</strong>
                </Alert>
            </div>
        );
    }

    const { title, description, deadline, auctionOwnerDTO, auctionHighestBidDTO } = data;

    const authenticatedUserId = useSelector((state) => state.user.userId);
    const ownerId = auctionOwnerDTO.id;

    const now = new Date();
    const timeDifferenceInHours = differenceInHours(new Date(deadline), now);
    const timeDifferenceInMinutes = differenceInMinutes(new Date(deadline), now);
    const timeDifferenceInSeconds = differenceInSeconds(new Date(deadline), now);
    const timeDifferenceInDays = differenceInDays(new Date(deadline), now);

    let timerColor = colors.green;
    if (timeDifferenceInDays < 0) {
        timerColor = colors.grey;
    } else if (timeDifferenceInDays < 1) {
        timerColor = colors.yellow;
        if (timeDifferenceInHours < 1) {
            timerColor = colors.red;
        }
    }

    return (
        <Grid
            container
            sx={{
                gap: 2,
                padding: '30px',
                paddingTop: '10px',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
            }}
        >
            <Grid item xs={12} sm={7} sx={{ padding: '20px' }}>
                <Box>
                    <Typography variant="h3" fontWeight={500}>
                        {title.toUpperCase()}
                    </Typography>
                </Box>

                <Box
                    item
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    <ImageCarousel images={images} />
                </Box>
                <Box
                    sx={{
                        backgroundColor: timerColor,
                        borderRadius: '5px',
                        padding: '6px 15px',
                        width: '95%',
                    }}
                >
                    <Typography sx={{ fontWeight: 400, fontSize: '18px' }}>
                        Time Left: {timeDifferenceInHours}:
                        {timeDifferenceInMinutes < 10
                            ? `0${timeDifferenceInMinutes}`
                            : `${timeDifferenceInMinutes % 60}`}
                        :
                        {timeDifferenceInSeconds < 10
                            ? `0${timeDifferenceInSeconds % 60}`
                            : `${timeDifferenceInSeconds % 60}`}
                    </Typography>
                </Box>
                <Grid
                    container
                    sx={{ marginTop: 1, alignItems: 'center', padding: '10px' }}
                    spacing={1}
                >
                    <Typography variant="h5">Tags:</Typography>
                    {tags.map((tag) => (
                        <Grid item key={tag}>
                            <Chip
                                label={tag}
                                size="medium"
                                sx={{
                                    backgroundColor: colors.water_green,
                                    color: 'white',
                                    fontSize: '15px',
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Typography sx={{ margin: '15px' }}>{description}</Typography>
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Toolbar
                        sx={{ borderBottom: `1px solid ${colors.water_green} `, width: '100%' }}
                    >
                        <Button
                            variant="text"
                            sx={{
                                color: 'black',
                                cursor: 'pointer',
                                fontSize: '16px',
                                padding: '0',
                                margin: '0',
                                fontWeight: window === 'info' ? 650 : 400,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                            onClick={() => setWindow('info')}
                        >
                            Auction Info
                        </Button>
                        <Button
                            variant="h7"
                            sx={{
                                color: 'black',
                                cursor: 'pointer',
                                ml: '1rem',
                                padding: '0',
                                fontSize: '16px',
                                fontWeight: window === 'questions' ? 650 : 400,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                            onClick={() => setWindow('questions')}
                        >
                            Questions & Comments
                        </Button>
                    </Toolbar>
                    <Grid container>
                        {window === 'info' ? (
                            <TechnicalInfo info={data} user={auctionOwnerDTO} />
                        ) : (
                            <Typography>Questions & Comments</Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ padding: '20px', margin: '0 auto' }}>
                {authenticatedUserId === ownerId ? <DangerZone title={title} /> : <></>}
            </Grid>
        </Grid>
    );
}
