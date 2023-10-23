import React from 'react';
import { Grid, Typography, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function TechnicalInfo({ info, user }) {
    const { brand, color, gasType, basePrice, modelYear, milage, doorsAmount, gearShiftType } =
        info;

    const formattedDeadline = new Date(info.deadline).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    const navigate = useNavigate();

    const handleUserPageRedirect = () => {
        if (user) {
            navigate(`/user/${user.id}`);
        } else {
            navigate(`*`);
        }
    };

    function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

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
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleUserPageRedirect}
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
                        <Typography
                            fontSize={'22px'}
                            fontWeight={650}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                            onClick={() => handleUserPageRedirect}
                        >
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
                            <b>Brand:</b> {capitalizeFirstLetter(brand)}
                        </Typography>
                        <Typography>
                            <b>Color:</b> {capitalizeFirstLetter(color)}
                        </Typography>
                    </Box>
                    <Box item gap={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            <b>Fuel Type:</b> {capitalizeFirstLetter(gasType)}
                        </Typography>
                        <Typography>
                            <b>Min Price:</b> {basePrice}
                        </Typography>
                    </Box>
                    <Box item gap={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            <b>Year:</b> {modelYear}
                        </Typography>
                        <Typography>
                            <b>Mileage:</b> {milage}
                        </Typography>
                    </Box>
                    <Box item gap={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            <b>Car doors:</b> {doorsAmount}
                        </Typography>
                        <Typography>
                            <b>Gear shift type:</b> {capitalizeFirstLetter(gearShiftType)}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}
