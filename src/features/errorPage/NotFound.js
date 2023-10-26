import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import not_found from '../commons/not_found.png';
import theme from '../../utils/desgin/Theme';
import { useNavigate } from 'react-router-dom';
import colors from '../../utils/desgin/Colors';
export const NotFound = () => {
    const nav = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            <img
                src={not_found}
                alt="not found"
                style={{ width: '15%', height: 'auto', marginTop: '10%' }}
            />
            <Typography
                sx={{
                    color: 'black',
                    fontSize: theme.typography.XxLarge.fontSize,
                    fontWeight: 875,
                    marginTop: '0.5%',
                    marginBottom: '0.125%',
                }}
            >
                404
            </Typography>
            <Typography
                sx={{
                    color: 'black',
                    fontSize: theme.typography.Small.fontSize,
                    fontWeight: 600,
                }}
            >
                The page you are trying to reach was not found
            </Typography>
            <Button
                style={{
                    backgroundColor: colors.water_green,
                    color: 'white',
                    textTransform: 'none',
                    width: '10%',
                    height: 'fit-content',
                    paddingTop: '0.5%',
                    paddingBottom: '0.5%',
                    marginTop: '1%',
                    fontSize: theme.typography.Xsmall.fontSize,
                }}
                onClick={() => nav('/')}
            >
                RETURN TO DASHBOARD
            </Button>
        </Box>
    );
};
