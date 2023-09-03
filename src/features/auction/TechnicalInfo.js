import React from 'react';
import { Grid, Typography, Box, Avatar } from '@mui/material';

export function TechnicalInfo({ info, user }) {
    return (
        <Grid container>
            <Grid
                container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}
            >
                <Box
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box>
                        {user.avatar ? (
                            <Avatar
                                src={user.avatar}
                                sx={{
                                    width: '80px',
                                    height: '80px',
                                }}
                            />
                        ) : (
                            <Avatar
                                sx={{
                                    width: '80px',
                                    height: '80px',
                                }}
                            />
                        )}
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography fontWeight={650}>Auction ending date:</Typography>
                    <Typography ml={1}>{info.endDate.toLocaleString()}</Typography>
                </Box>
            </Grid>
            <Grid
                item
                sx={{
                    display: 'flex',
                    backgroundColor: '#e0e0e0',
                    flexDirection: 'column',
                    mt: '15px',
                    p: '20px',
                    borderRadius: '5px',
                }}
            >
                <Typography sx={{ fontWeight: 650, fontSize: '20px' }}>
                    Technical Information
                </Typography>
                <Grid
                    container
                    gap={4}
                    sx={{
                        display: 'flex',
                        mt: '15px',
                    }}
                >
                    <Box
                        item
                        gap={1}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography>
                            <b>Brand:</b> {info.brand}
                        </Typography>
                        <Typography>
                            <b>Color:</b> {info.color}
                        </Typography>
                    </Box>
                    <Box item gap={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            <b>Fuel Type:</b> {info.fuelType}
                        </Typography>
                        <Typography>
                            <b>Min Price:</b> {info.basePrice}
                        </Typography>
                    </Box>
                    <Box item gap={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            <b>Years:</b> 4
                        </Typography>
                        <Typography>
                            <b>Mileage:</b> {info.mileage}
                        </Typography>
                    </Box>
                    <Box item gap={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            <b>Car doors:</b> {info.doors}
                        </Typography>
                        <Typography>
                            <b>Gear shift type:</b> {info.gearShift}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}
