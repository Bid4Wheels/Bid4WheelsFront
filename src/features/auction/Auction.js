import React, { useState } from 'react';
import { Grid, Typography, Chip, Box, Toolbar, Avatar } from '@mui/material';
import { useParams } from 'react-router';
import { TechnicalInfo } from './TechnicalInfo';
import colors from '../../utils/desgin/Colors';
import theme from '../../utils/desgin/Theme';

export function Auction() {
    const id = useParams().auctionId;
    const [window, setWindow] = useState('info');
    const [info, setInfo] = useState({
        title: '2018 Toyota Camry',
        tags: ['Sedan', 'Low mileage', 'Great condition', 'One owner'],
        images: [
            'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        ],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nis',
        brand: 'Toyota',
        fuelType: 'Gasoline',
        basePrice: 10000,
        year: 2018,
        mileage: 10000,
        doors: 4,
        gearShift: 'Automatic',
        endDate: '2021-10-10',
    });
    const [user, setUser] = useState({
        name: 'John Doe',
        avatar: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        rating: 4.5,
    });

    if (!id) {
        return <div>Invalid auction id</div>;
    }

    const [index, setIndex] = useState(0);

    return (
        <Grid
            container
            sx={{
                display: 'flex',
                gap: 2,
                padding: '30px',
                paddingTop: '10px',
            }}
        >
            <Grid item xs={12} sm={7}>
                <Box>
                    <Typography variant="h3" fontWeight={500}>
                        2018 Toyota Camry
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: '10px',
                        height: '35%',
                        display: 'flex',
                        padding: '10px',
                    }}
                >
                    <img
                        src={info.images[0]}
                        alt="car"
                        style={{
                            objectFit: 'cover',
                            maxWidth: '50%',
                            borderRadius: '10px',
                            marginRight: '10px',
                        }}
                    />
                    <img
                        src={info.images[1]}
                        alt="car"
                        style={{
                            objectFit: 'cover',
                            maxWidth: '50%',
                            borderRadius: '10px',
                            marginLeft: '10px',
                        }}
                    />
                </Box>

                <Grid
                    container
                    sx={{ marginTop: 2, display: 'flex', alignItems: 'center', padding: '10px' }}
                    spacing={1}
                >
                    <Typography variant="h5">Tags:</Typography>
                    {info.tags.map((tag) => (
                        <Grid item key={tag}>
                            <Chip
                                label={tag}
                                size="medium"
                                sx={{ backgroundColor: colors.water_green, color: 'white' }}
                            />
                        </Grid>
                    ))}
                    <Typography sx={{ marginTop: '15px' }}>{info.description}</Typography>
                </Grid>
                <Grid
                    container
                    sx={{
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Toolbar
                        sx={{ borderBottom: `1px solid ${colors.water_green} `, width: '100%' }}
                    >
                        <Typography
                            variant="h7"
                            sx={{
                                color: 'black',
                                cursor: 'pointer',
                                fontWeight: window === 'info' ? 650 : 400,
                            }}
                            onClick={() => setWindow('info')}
                        >
                            Auction Info
                        </Typography>
                        <Typography
                            variant="h7"
                            sx={{
                                color: 'black',
                                cursor: 'pointer',
                                ml: '1rem',
                                fontWeight: window === 'questions' ? 650 : 400,
                            }}
                            onClick={() => setWindow('questions')}
                        >
                            Questions & Comments
                        </Typography>
                    </Toolbar>
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                        }}
                    >
                        <Box item sx={{ display: 'flex', width: '45%' }}>
                            <Box>
                                <Avatar sx={{ width: '80px', height: '80px' }}></Avatar>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    padding: '10px',
                                    gap: '8px',
                                    ml: '10px',
                                }}
                            >
                                <Typography fontSize={'22px'} fontWeight={650}>
                                    {user.name}
                                </Typography>
                                <Typography>User Rating: {user.rating}</Typography>
                            </Box>
                        </Box>
                        <Box
                            item
                            sx={{
                                width: '45%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography fontWeight={650}>Auction ending date:&nbsp;</Typography>
                            {info.endDate}
                        </Box>
                        {window === 'info' ? (
                            <TechnicalInfo info={info} />
                        ) : (
                            <Typography>Questions & Comments</Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
