import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import colors from '../../utils/desgin/Colors';
import SwipeableViews from 'react-swipeable-views-react-18-fix';

export function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length / 2 - 1));
    };

    if (!images || images.length === 0) {
        return null;
    }

    if (images.length === 1) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                }}
            >
                <img
                    src={images[0]}
                    alt={`Image 0`}
                    style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '100%',
                        borderRadius: '5px',
                        objectFit: 'cover',
                    }}
                />
            </Box>
        );
    }
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            <IconButton
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
                sx={{
                    backgroundColor: colors.water_green,
                    borderRadius: '50%',
                    color: 'white',
                    '&:hover': { backgroundColor: colors.on_stand_water_green },
                }}
            >
                <NavigateBeforeIcon />
            </IconButton>
            <SwipeableViews
                index={currentIndex}
                onChangeIndex={setCurrentIndex}
                slideCount={images.length / 2}
                slideStyle={{ width: '50%' }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '10px',
                        }}
                    >
                        <img
                            src={image}
                            alt={`Image ${index}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '100%',
                                borderRadius: '5px',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                ))}
            </SwipeableViews>
            <IconButton
                onClick={handleNextClick}
                disabled={currentIndex >= images.length / 2 - 1}
                sx={{
                    backgroundColor: colors.water_green,
                    borderRadius: '50%',
                    color: 'white',
                    '&:hover': { backgroundColor: colors.on_stand_water_green },
                }}
            >
                <NavigateNextIcon />
            </IconButton>
        </Box>
    );
}
