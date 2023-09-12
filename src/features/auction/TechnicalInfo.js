import React from 'react';
import { Grid, Typography, Box, Avatar } from '@mui/material';

export function TechnicalInfo({ info, user }) {
    const formattedDeadline = new Date(info.deadline).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    return (
        <Grid container>
            <Grid
                container
                sx={{
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
                        {user.profilePicture ? (
                            <Avatar
                                src={user.profilePicture}
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
                    <Typography ml={1}>
                        {formattedDeadline ? formattedDeadline : 'No deadline'}
                    </Typography>
                </Box>
            </Grid>
            <Grid
                item
                sx={{
                    backgroundColor: '#e0e0e0',
                    flexDirection: 'column',
                    mt: '15px',
                    p: '20px',
                    borderRadius: '5px',
                    width: '100%',
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
                            <b>Fuel Type:</b> {info.gasType}
                        </Typography>
                        <Typography>
                            <b>Min Price:</b> {info.basePrice}
                        </Typography>
                    </Box>
                    <Box item gap={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            <b>Year:</b> {info.modelYear}
                        </Typography>
                        <Typography>
                            <b>Mileage:</b> {info.milage}
                        </Typography>
                    </Box>
                    <Box item gap={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            <b>Car doors:</b> {info.doorsAmount}
                        </Typography>
                        <Typography>
                            <b>Gear shift type:</b> {info.gearShiftType}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}
