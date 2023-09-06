import React, { useEffect, useState } from 'react';
import { Grid, Typography, Chip, Box, Toolbar, Button, Paper } from '@mui/material';
import { useParams } from 'react-router';
import {
    differenceInHours,
    differenceInDays,
    differenceInMinutes,
    differenceInSeconds,
} from 'date-fns';
import { TechnicalInfo } from './TechnicalInfo';
import { ImageCarousel } from './ImageCarousel';
import colors from '../../utils/desgin/Colors';
import car1 from '../commons/temp/car1.jpeg';
import car2 from '../commons/temp/car2.jpeg';
import car3 from '../commons/temp/car3.jpeg';
import car4 from '../commons/temp/car4.jpeg';
import car5 from '../commons/temp/car5.jpg';

export function Auction() {
    const id = useParams().auctionId;
    const [window, setWindow] = useState('info');
    const [info, setInfo] = useState({
        title: '2018 Toyota Camry',
        tags: ['Sedan', 'Low mileage', 'Great condition', 'One owner'],
        images: [car1, car2, car3, car4, car5],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nis',
        brand: 'Toyota',
        color: 'Black',
        fuelType: 'Gasoline',
        basePrice: 10000,
        year: 2018,
        mileage: 10000,
        doors: 4,
        gearShift: 'Automatic',
        endDate: new Date('2023-09-07T22:30:00'),
    });
    const [user, setUser] = useState({
        name: 'John Doe',
        avatar: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        rating: 4.5,
    });

    const now = new Date();
    const timeDifferenceInHours = differenceInHours(info.endDate, now);
    const timeDifferenceInMinutes = differenceInMinutes(info.endDate, now);
    const timeDifferenceInSeconds = differenceInSeconds(info.endDate, now);
    const timeDifferenceInDays = differenceInDays(info.endDate, now);

    let color = colors.green;

    if (timeDifferenceInDays < 0) {
        // Subasta ya terminada (Gris)
        color = colors.grey;
    } else if (timeDifferenceInDays < 1) {
        // Menos de un día (Amarillo)
        color = colors.yellow;
        if (timeDifferenceInHours < 1) {
            // Menos de una hora (Rojo)
            color = colors.red;
        }
    }

    if (!id) {
        return <div>Invalid auction id</div>;
    }

    return (
        <Grid
            container
            sx={{
                display: 'flex',
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
                        2018 Toyota Camry
                    </Typography>
                </Box>

                <Box
                    item
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    <ImageCarousel images={info.images} />
                </Box>
                <Box
                    sx={{
                        backgroundColor: color,
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
                    sx={{ marginTop: 1, display: 'flex', alignItems: 'center', padding: '10px' }}
                    spacing={1}
                >
                    <Typography variant="h5">Tags:</Typography>
                    {info.tags.map((tag) => (
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
                    <Typography sx={{ marginTop: '15px' }}>{info.description}</Typography>
                </Grid>
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
                            <TechnicalInfo info={info} user={user} />
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
