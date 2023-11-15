import { Avatar, Box, Rating, Typography } from '@mui/material';
import React from 'react';
import colors from '../../../../utils/desgin/Colors';

export const ReviewCard = ({
    userImage,
    userName,
    reviewValue,
    reviewOrigin,
    review,
    reviewDate,
    userLastName,
}) => {
    return (
        <Box sx={{ display: 'flex', maxHeight: '200px' }}>
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '15px',
                    width: '100%',
                }}
            >
                <Avatar
                    src={userImage === 'default' ? null : userImage}
                    sx={{ width: 65, height: 65 }}
                ></Avatar>
                <Box
                    style={{
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '20px',
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ fontSize: '22px', fontWeight: 480 }}>
                            {userName + ' ' + userLastName}
                        </Typography>
                        <Rating
                            precision={0.5}
                            value={reviewValue}
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: colors.water_green,
                                },
                                mt: '5px',
                                ml: '10px',
                            }}
                            disabled
                        ></Rating>
                    </Box>
                    <Typography sx={{ fontSize: '14px', color: '#9C9C9C', marginBottom: '10px' }}>
                        {'On ' + reviewOrigin + ', ' + reviewDate}
                    </Typography>

                    <Typography sx={{}}>{review}</Typography>
                </Box>
            </Box>
        </Box>
    );
};
