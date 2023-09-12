import React, { useState } from 'react';
import { Grid, Typography, Chip, Box, Toolbar, Button, Paper, Skeleton } from '@mui/material';
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

export function Auction() {
    const id = useParams().auctionId;
    const [window, setWindow] = useState('info');
    const { data, error, isLoading } = useGetAuctionByIdQuery(id);
    const images = [car1, car2, car3, car4, car5];
    const tags = ['Sedan', 'Low mileage', 'Great condition', 'One owner'];
    console.log(data);
    const now = new Date();
    const timeDifferenceInHours = differenceInHours(new Date('2023-09-14T22:30:00'), now);
    const timeDifferenceInMinutes = differenceInMinutes(new Date('2023-09-14T22:30:00'), now);
    const timeDifferenceInSeconds = differenceInSeconds(new Date('2023-09-14T22:30:00'), now);
    const timeDifferenceInDays = differenceInDays(new Date('2023-09-14T22:30:00'), now);

    let colour = colors.green;

    const {
        title,
        description,
        deadline,
        basePrice,
        brand,
        model,
        status,
        milage,
        gasType,
        modelYear,
        color,
        doorsAmount,
        gearShiftType,
        auctionOwnerDTO,
        auctionHighestBidDTO,
    } = data;

    const { id: ownerId, name, lastName, profilePicture } = auctionOwnerDTO;
    console.log(ownerId);

    if (timeDifferenceInDays < 0) {
        // Subasta ya terminada (Gris)
        colour = colors.grey;
    } else if (timeDifferenceInDays < 1) {
        // Menos de un día (Amarillo)
        colour = colors.yellow;
        if (timeDifferenceInHours < 1) {
            // Menos de una hora (Rojo)
            colour = colors.red;
        }
    }

    if (!id) {
        return <div>Invalid auction id</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                        {title}
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
                        backgroundColor: colour,
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
                <Paper sx={{ padding: '20px', borderRadius: '5px', width: '100%' }}>
                    <Typography variant="h5">Bids</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}
