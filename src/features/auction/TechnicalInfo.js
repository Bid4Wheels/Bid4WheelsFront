import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

export function TechnicalInfo({ info }) {
    return (
        <Grid
            container
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
    );
}
