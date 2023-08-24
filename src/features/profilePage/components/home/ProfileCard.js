import React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Button, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../../utils/desgin/Theme';
import colors from '../../../../utils/desgin/Colors';

export const ProfileCard = ({ canEdit, userId }) => {
    return (
        <Box
            sx={{
                width: 389,
                height: 839,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 12,
                border: '3px solid #00d591',
                background: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                src={'https://upload.wikimedia.org/wikipedia/commons/d/d8/Dulce_de_membrillo.jpg'}
                alt="Profile"
                style={{
                    alignSelf: 'center',
                    width: 274,
                    height: 274,
                    flexShrink: 0,
                    borderRadius: '75%',
                }}
            />
            <Typography
                variant="h4"
                sx={{
                    color: '#000',
                    fontFamily: 'Roboto', // Use Roboto font
                    fontSize: theme.typography.XxLarge.fontSize, // Use theme size
                    fontWeight: 500,
                    lineHeight: '26px',
                    letterSpacing: 0.46,
                    marginTop: 2,
                    marginBottom: 2,
                }}
            >
                hola
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    overflow: 'auto',
                    marginBottom: 1,
                }}
            >
                <MailIcon />
                <Typography
                    variant="body1"
                    sx={{
                        color: '#000',
                        fontFamily: 'Roboto',
                        fontSize: theme.typography.Medium.fontSize,
                        textDecoration: 'underline',
                    }}
                >
                    example@mail.com
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    overflow: 'auto',
                }}
            >
                <PhoneIcon />
                <Typography
                    variant="body1"
                    sx={{
                        color: '#000',
                        fontFamily: 'Roboto',
                        fontSize: theme.typography.Medium.fontSize,
                    }}
                >
                    +54113232323232
                </Typography>
            </Box>
            {canEdit && (
                <button
                    className="EditButton"
                    style={{
                        display: 'flex',
                        width: 100,
                        height: 49,
                        padding: '6px 16px',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 0,
                        borderRadius: 4,
                        backgroundColor: colors.water_green,
                        boxShadow:
                            '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
                        border: 'none',
                        marginTop: 2,
                    }}
                >
                    <Button
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& .EditText': {
                                color: '#fff',
                                fontFamily: 'Roboto',
                                fontSize: theme.typography.Small.fontSize,
                                textTransform: 'uppercase',
                            },
                        }}
                    >
                        <div className="EditText">Edit</div>
                        <EditIcon style={{ color: 'white' }} />
                    </Button>
                </button>
            )}
        </Box>
    );
};
